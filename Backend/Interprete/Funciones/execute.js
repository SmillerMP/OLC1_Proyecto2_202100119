const {Instruccion, tipoInstruccion} = require('../instruccion');

class Execute extends Instruccion {
    constructor(funcion, fila, columna) {
        super(tipoInstruccion.EXECUTE, fila, columna);
        this.funcion = funcion;
    }

    interpretar(entorno) {
        this.funcion.interpretar(entorno);
        return this;
    }

}

module.exports = Execute;