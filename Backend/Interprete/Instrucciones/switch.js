const {Instruccion, tipoInstruccion} = require('../instruccion');
let { agregarSalida, agregarError } = require('../salidas');

class Switch extends Instruccion {
    constructor(condicional, cases, defaultCase, fila, columna) {
        super(tipoInstruccion.SWITCH, fila, columna);
        this.condicional = condicional;
        this.cases = cases;
        this.defaultCase = defaultCase;
    }

    interpretar(entorno) {

        this.condicional.interpretar(entorno);
        let seguir = false;


        //console.log(this.condicional)
        for (let i = 0; i < this.cases.length; i++) {

            let resultadoCase = this.cases[i].condicion.interpretar(entorno);

            if (this.condicional.valor == resultadoCase.valor || seguir) {
                const instruccion = this.cases[i]
                let resultado = instruccion.interpretar(entorno);

                //console.log(resultado.tipo)

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    break;

                } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                    if (!entorno.esCiclo()) {
                        console.log("Error Semántico: Continue no está dentro de un ciclo.")      
                        agregarSalida("Error Semántico: Continue no está dentro de un ciclo.")    
                        agregarError("Semántico", "Continue no está dentro de un ciclo.", this.fila, this.columna)          
                        return this;
                    }
                    return resultado;

                } else if (resultado.tipo == tipoInstruccion.RETURN) {
                    if (!entorno.esFuncion()) {
                        console.log("Error Semántico: return no está dentro de una función.")
                        agregarSalida("Error Semántico: return no está dentro de una función.")
                        agregarError("Semántico", "return no está dentro de una función.", this.fila, this.columna)
                        return this;
                    }    
                    return resultado;
                
                } else {
                    seguir = true;
                }
            }
                
        }

        if (this.defaultCase != null && !seguir) {
            for (let i = 0; i < this.defaultCase.length; i++) {
                const instruccion = this.defaultCase[i];
                let resultado = instruccion.interpretar(entorno);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    break;

                } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                    if (!entorno.esCiclo()) {
                        console.log("Error Semántico: Continue no está dentro de un ciclo.")    
                        agregarSalida("Error Semántico: Continue no está dentro de un ciclo.")     
                        agregarError("Semántico", "Continue no está dentro de un ciclo.", this.fila, this.columna)           
                        return this;
                    }
                    return resultado;

                } else if (resultado.tipo == tipoInstruccion.RETURN) {
                    if (!entorno.esFuncion()) {
                        console.log("Error Semántico: return no está dentro de una función.")
                        agregarSalida("Error Semántico: return no está dentro de una función.")
                        agregarError("Semántico", "return no está dentro de una función.", this.fila, this.columna)
                        return this;
                    }    
                    return resultado;
                
                }             
            }
        }

        return this;

    }

}

module.exports = Switch;