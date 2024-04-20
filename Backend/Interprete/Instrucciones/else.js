const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class Else extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(tipoInstruccion.ELSE, fila, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoElse = new Entorno(tipoInstruccion.ELSE, entorno)

        // verificacion de break, continue y return dentro de un ciclo
        let sizeInstrucciones = this.instrucciones.length - 1;
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            if (instruccion.tipo == tipoInstruccion.BREAK || instruccion.tipo == tipoInstruccion.CONTINUE) {
                if (!entornoElseIf.esCiclo()) {
                    console.log("Error Semántico: break o continue, no está dentro de un ciclo.")                    
                    return this;
                } 

                if (i != sizeInstrucciones) {
                    console.log("Error Semántico: break o continue, no es la última instrucción.")
                    return this;
                }

            } else if (instruccion.tipo == tipoInstruccion.RETURN) {
                if (!entornoElseIf.esFuncion()) {
                    console.log("Error Semántico: return no está dentro de una función.")
                    return this;
                }

                if (i != sizeInstrucciones) {
                    console.log("Error Semántico: return no es la ultima instruccion.")
                    return this;
                }

            }         
        }



        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            let resultado = instruccion.interpretar(entornoElse);

            if (resultado.tipo == tipoInstruccion.BREAK || instruccion.tipo == tipoInstruccion.CONTINUE) { 
                return resultado;
                
            }           
        }

        return this;

    }

}

module.exports = Else;