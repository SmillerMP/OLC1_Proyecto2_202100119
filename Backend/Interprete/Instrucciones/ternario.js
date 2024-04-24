const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida, agregarError} = require('../salidas');

class Ternario extends Instruccion {
    constructor(condicion, insTrue, insFalse ,fila, columna) {
        super(tipoInstruccion.TERNARIO, fila, columna);
        this.condicion = condicion;
        this.insTrue = insTrue;
        this.insFalse = insFalse;
    }

    interpretar(entorno) {

        let entornoTernario = new Entorno(tipoInstruccion.TERNARIO, entorno)
        this.condicion.interpretar(entornoTernario);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del ternario no es booleana.")
            agregarSalida("Error Semántico: La condición del ternario no es booleana.")
            agregarError("Semántico", "La condición del ternario no es booleana.", this.fila, this.columna)
            return this;
        }


        if (this.condicion.valor == true) {

            for (let i = 0; i < this.insTrue.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El break no está dentro de un ciclo.")
                        agregarSalida("Error Semántico: El break no está dentro de un ciclo.")
                        agregarError("Semántico", "El break no está dentro de un ciclo.", this.fila, this.columna)

                        return this;
                    } 
                    return resultado;
                    
                } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El continue no está dentro de un ciclo.")
                        agregarSalida("Error Semántico: El continue no está dentro de un ciclo.")
                        agregarError("Semántico", "El continue no está dentro de un ciclo.", this.fila, this.columna)
                        return this;
                    } 
                    return resultado;
                }              
            }

            return this;
        } else {

            for (let i = 0; i < this.insFalse.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El break no está dentro de un ciclo.")
                        agregarSalida("Error Semántico: El break no está dentro de un ciclo.")
                        agregarError("Semántico", "El break no está dentro de un ciclo.", this.fila, this.columna)
                        return this;
                    } 
                    return resultado;
                    
                } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El continue no está dentro de un ciclo.")
                        agregarSalida("Error Semántico: El continue no está dentro de un ciclo.")
                        agregarError("Semántico", "El continue no está dentro de un ciclo.", this.fila, this.columna)
                        return this;
                    } 
                    return resultado;
                }                     
            }

            return this;
        }
    }
}

module.exports = Ternario;