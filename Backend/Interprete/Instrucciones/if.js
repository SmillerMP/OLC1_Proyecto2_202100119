const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../entorno/entorno');

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


        if (Boolean(this.condicion.valor)) {

            //console.log(this.instrucciones);
            /* 
                en el momento que se realiza el console log
                no se ha ejecutado las instrucciones por lo que el resultado
                de las instrucciones suele ser un error, debe de pasar por
                el interprete de primero
            */

            this.instrucciones.forEach(instruccion => {
                instruccion.interpretar(entornoIf);

                //console.log(instruccion);
            });


            // guardarrrr el entorno
        } else {
            // else if posible

        }

    }

}

module.exports = If;