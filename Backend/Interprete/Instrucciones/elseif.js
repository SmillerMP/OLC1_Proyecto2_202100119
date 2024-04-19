const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class ElseIf extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.ELSEIF, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {
       
        let entornoElseIf = new Entorno(tipoInstruccion.ELSEIF, entorno)
        this.condicion.interpretar(entornoElseIf);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del else if no es booleana.")
            return this;
        }
       
        if (this.condicion.valor = true) {

            // verificacion de break dentro de un ciclo
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                if (instruccion.tipo == tipoInstruccion.BREAK) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El break no está dentro de un ciclo.")
                        return this;
                    }                        
                }          
            }


            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoElseIf);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El break no está dentro de un ciclo.")
                        return this;
                    } 
                    
                    return resultado;
                } else if (resultado == "continue") {
                    continue;
                }              
            }

            return this;

            // guardarrrr el entorno
        } else {
            // else if posible
            return false;

        }

    }

}

module.exports = ElseIf;