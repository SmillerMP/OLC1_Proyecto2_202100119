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
    ELSEIF: 'ELSEIF',
    ELSE: 'ELSE',
    SENTENCIAIF: 'SENTENCIAIF',
    WHILE: 'WHILE',
    FOR: 'FOR',
    BREAK: 'BREAK',
    DECLARACION: 'DECLARACION',
    TERNARIO: 'TERNARIO',
}

module.exports = { Instruccion, tipoInstruccion }