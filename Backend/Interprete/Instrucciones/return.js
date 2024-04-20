const { TipoDato } = require('../expresion');
const { Instruccion, tipoInstruccion } = require("../instruccion");


class Return extends Instruccion{
    constructor(expresion, fila, columna){
        super(tipoInstruccion.RETURN, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno){

        if (this.expresion != null) {
            this.expresion.interpretar(entorno);
        }

        return this;
    }
}

module.exports = Return;