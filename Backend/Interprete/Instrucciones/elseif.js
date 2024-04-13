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


        if (Boolean(this.condicion.valor)) {

            this.instrucciones.forEach(instruccion => {
                instruccion.interpretar(entornoElseIf);

                //console.log(instruccion);
            });

            return true;

            // guardarrrr el entorno
        } else {
            // else if posible
            return false;

        }

    }

}

module.exports = ElseIf;