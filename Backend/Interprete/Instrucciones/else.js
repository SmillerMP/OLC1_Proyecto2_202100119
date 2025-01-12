const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida, agregarError } = require('../salidas');

class Else extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(tipoInstruccion.ELSE, fila, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoElse = new Entorno(tipoInstruccion.ELSE, entorno)

        // verificacion de break, continue y return dentro de un ciclo


        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            let resultado = instruccion.interpretar(entornoElse);

            if (resultado.tipo == tipoInstruccion.BREAK) {
                if (!entornoElse.esCiclo()) {
                    console.log("Error Semántico: break, no está dentro de un ciclo.")   
                    agregarSalida("Error Semántico: break, no está dentro de un ciclo.")       
                    agregarError("Semántico", "break, no está dentro de un ciclo.", this.fila, this.columna)          
                    return this;
                } 
                return resultado;

            } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                if (!entornoElse.esCiclo()) {
                    console.log("Error Semántico: Continue no está dentro de un ciclo.")   
                    agregarSalida("Error Semántico: Continue no está dentro de un ciclo.")     
                    agregarError("Semántico", "Continue no está dentro de un ciclo.", this.fila, this.columna)            
                    return this;
                }
                return resultado;

            } else if (resultado.tipo == tipoInstruccion.RETURN) {
                if (!entornoElse.esFuncion()) {
                    console.log("Error Semántico: return no está dentro de una función.")
                    agregarSalida("Error Semántico: return no está dentro de una función.")
                    agregarError("Semántico", "return no está dentro de una función.", this.fila, this.columna)
                    return this;
                }    
                return resultado;
            
            }         
        }

        return this;

    }

}

module.exports = Else;