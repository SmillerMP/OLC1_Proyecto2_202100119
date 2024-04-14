const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class While extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.WHILE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoWhile = new Entorno(tipoInstruccion.WHILE, entorno)
        this.condicion.interpretar(entornoWhile);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del if no es booleana.")
            return this;
        }

        if (Boolean(this.condicion.valor)) {

            this.instrucciones.forEach(instruccion => {
                instruccion.interpretar(entornoWhile);
            });

            return true;
        } else {
            // la codicion no se cumple
            return false;

        }

    }

}

module.exports = While;