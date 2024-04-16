const {Instruccion, tipoInstruccion} = require('../instruccion');

class Break extends Instruccion {
    constructor(valor, fila, columna) {
        super(tipoInstruccion.BREAK, fila, columna);
        this.valor = valor;
    }

    interpretar(entorno) {
        return this;
    }

}

module.exports = Break;