const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class Break extends Instruccion {
    constructor(expresion, fila, columna) {
        super(tipoInstruccion.IF, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno) {

        this.expresion.interpretar(entorno);
        return "break";
    }

}

module.exports = If;