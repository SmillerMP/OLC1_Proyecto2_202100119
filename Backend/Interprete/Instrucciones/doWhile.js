const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class DoWhile extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.DOWHILE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoDoWhile = new Entorno(tipoInstruccion.DOWHILE, entorno)

        // verificacion de break, continue y dentro de un ciclo
        // y verificacion de return dentro de una funcion
        let sizeInstrucciones = this.instrucciones.length - 1;
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            if (instruccion.tipo == tipoInstruccion.BREAK || instruccion.tipo == tipoInstruccion.CONTINUE) {
                if ( i != sizeInstrucciones) {
                    console.log("Error Semántico: break o continue, no es la última instrucción.")
                    return this;
                }  
                                      
            } else if (instruccion.tipo == tipoInstruccion.RETURN) {
                if (!entornoDoWhile.esFuncion()) {
                    console.log("Error Semántico: return no está dentro de una función.")
                    return this;
                }

                if (i != sizeInstrucciones) {
                    console.log("Error Semántico: return no es la ultima instruccion.")
                    return this;
                }

            }          
        }

        let salir = false;

        //console.log(this.condicion)
        this.condicion.interpretar(entornoDoWhile);
        //console.log(this.condicion)

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del do while no es booleana.")
            return this;
        }

        while (this.condicion.valor == true) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado.tipo ==  tipoInstruccion.BREAK) {
                    salir = true;
                    break;
                } else if (resultado.tipo ==  tipoInstruccion.CONTINUE) {
                    break;
                }            
            }
            

            if (salir) {
                break;
            }
            this.condicion.interpretar(entornoDoWhile);
        }

        return this;

    }

}

module.exports = DoWhile;