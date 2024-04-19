const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class Else extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(tipoInstruccion.ELSE, fila, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoElse = new Entorno(tipoInstruccion.ELSE, entorno)

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
            let resultado = instruccion.interpretar(entornoElse);

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

    }

}

module.exports = Else;