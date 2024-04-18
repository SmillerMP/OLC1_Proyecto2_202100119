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
        this.condicion.interpretar(entornoIf);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del if no es booleana.")
            return this;
        }


        if (this.condicion.valor == true){
            //console.log(this)
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoIf);

                if (resultado.tipo == tipoInstruccion.BREAK) {
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