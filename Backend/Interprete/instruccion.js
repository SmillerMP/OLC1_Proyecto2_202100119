class Instruccion {
    constructor(tipo, fila, columna) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) { }
}

const tipoInstruccion = {
    PRINT: 'PRINT',
    IF: 'IF',
}

module.exports = { Instruccion, tipoInstruccion }