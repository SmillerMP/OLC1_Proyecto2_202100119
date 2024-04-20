const {Instruccion, tipoInstruccion} = require('../instruccion');

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




        for (let i = 0; i < this.cases.length; i++) {

            let instrucciones = this.cases[i].instrucciones;
            let sizeInstrucciones = instrucciones.length - 1;
            for (let j = 0; j < instrucciones.length; j++) {
                const instruccion = instrucciones[j];
                if (instruccion.tipo == tipoInstruccion.BREAK || instruccion.tipo == tipoInstruccion.CONTINUE) {
                    if (j != sizeInstrucciones) {
                        console.log("Error Semántico: break o continue, no es la última instrucción.")
                        return this;
                    }
                                        
                } else if (instruccion.tipo == tipoInstruccion.RETURN) {

                    if (!entorno.esFuncion()) {
                        console.log("Error Semántico: return no está dentro de una función.")
                        return this;
                    }

                    if (j != sizeInstrucciones) {
                        console.log("Error Semántico: return no es la ultima instruccion.")
                        return this;
                    }

                }          
            }           
        }


        //console.log(this.condicional)
        for (let i = 0; i < this.cases.length; i++) {

            let resultadoCase = this.cases[i].condicion.interpretar(entorno);
            // console.log(resultadoCase.valor)
            // console.log(this.condicional.valor)
            // console.log("--------------------")

            if (this.condicional.valor == resultadoCase.valor || seguir) {
                const instruccion = this.cases[i]
                let resultado = instruccion.interpretar(entorno);

                //console.log(resultado.tipo)

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    break;
                } else if (resultado == "continue") {
                    continue;
                }  else {
                    seguir = true;
                }
            }
                
        }

        if (this.defaultCase != null && !seguir) {
            for (let i = 0; i < this.defaultCase.length; i++) {
                const instruccion = this.defaultCase[i];
                let resultado = instruccion.interpretar(entorno);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    return resultado;
                } else if (resultado == "continue") {
                    continue;
                }              
            }
        }

        return this;

    }

}

module.exports = Switch;