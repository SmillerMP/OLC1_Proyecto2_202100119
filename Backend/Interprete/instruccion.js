class Instruccion {
    constructor(tipo, fila, columna) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) { }
}

const tipoInstruccion = {
    COUT: 'COUT',
    IF: 'IF',
}

module.exports = { Instruccion, tipoInstruccion }