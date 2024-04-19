const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class If extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.IF, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoIf = new Entorno(tipoInstruccion.IF, entorno)
        //console.log(this.condicion)
        this.condicion.interpretar(entornoIf);
        //console.log(this.condicion)
        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del if no es booleana.")
            return this;
        }


        if (this.condicion.valor == true){

            //console.log(this.instrucciones);
            /* 
                en el momento que se realiza el console log no se ha ejecutado las instrucciones por lo que el resultado de las instrucciones suele ser un error, debe de pasar por el interprete de primero
            */

            // For solo para verificar si existe un break dentro de un ciclo

            

            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                if (instruccion.tipo == tipoInstruccion.BREAK) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: El break no está dentro de un ciclo.")
                        return this;
                    }                        
                }          
            }
            
            //console.log(this)
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoIf);

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

module.exports = If;