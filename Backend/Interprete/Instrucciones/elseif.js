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
        //console.log(this.condicion)

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del else if no es booleana.")
            return this;  
        }
       
        // verificacion de break, continue y dentro de un ciclo
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
        


        if (this.condicion.valor == true) {

            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoElseIf);

                if (resultado.tipo == tipoInstruccion.BREAK || resultado.tipo == tipoInstruccion.CONTINUE) {
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