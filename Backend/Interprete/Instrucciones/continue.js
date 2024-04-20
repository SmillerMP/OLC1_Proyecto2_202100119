const {Instruccion, tipoInstruccion} = require('../instruccion');

class Continue extends Instruccion {
    constructor(valor, fila, columna) {
        super(tipoInstruccion.CONTINUE, fila, columna);
        this.valor = valor;
    }

    interpretar(entorno) {
        return this;
    }

}

module.exports = Continue;