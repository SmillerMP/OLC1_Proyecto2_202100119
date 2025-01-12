const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida, agregarError } = require('../salidas');

class ElseIf extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.ELSEIF, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        this.condicion.interpretar(entorno);
       
        let entornoElseIf = new Entorno(tipoInstruccion.ELSEIF, entorno)
        
        //console.log(this.condicion)

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del else if no es booleana.")
            agregarSalida("Error Semántico: La condición del else if no es booleana.");
            agregarError("Semántico", "La condición del else if no es booleana.", this.fila, this.columna)
            return this;  
        }
       
        // verificacion de break, continue y dentro de un ciclo

        if (this.condicion.valor == true) {

            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoElseIf);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    if (!entornoElseIf.esCiclo()) {
                        console.log("Error Semántico: break, no está dentro de un ciclo.") 
                        agregarSalida("Error Semántico: break, no está dentro de un ciclo.")       
                        agregarError("Semántico", "break, no está dentro de un ciclo.", this.fila, this.columna)            
                        return this;
                    } 
                    return resultado;
    
                } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                    if (!entornoElseIf.esCiclo()) {
                        console.log("Error Semántico: Continue no está dentro de un ciclo.") 
                        agregarSalida("Error Semántico: Continue no está dentro de un ciclo.")            
                        agregarError("Semántico", "Continue no está dentro de un ciclo.", this.fila, this.columna)       
                        return this;
                    }
                    return resultado;
    
                } else if (resultado.tipo == tipoInstruccion.RETURN) {
                    if (!entornoElseIf.esFuncion()) {
                        console.log("Error Semántico: return no está dentro de una función.")
                        agregarSalida("Error Semántico: return no está dentro de una función.")
                        agregarError("Semántico", "return no está dentro de una función.", this.fila, this.columna)
                        return this;
                    }    
                    return resultado;
                
                }          
            }
            return this;

            // guardarrrr el entorno
        } else {

            return false;

        }

    }

}

module.exports = ElseIf;