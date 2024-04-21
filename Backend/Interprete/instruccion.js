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
    DOWHILE: 'DOWHILE',
    FOR: 'FOR',
    CASE: 'CASE',
    SWITCH: 'SWITCH',
    BREAK: 'BREAK',
    CONTINUE: 'CONTINUE',
    DECLARACION: 'DECLARACION',
    TERNARIO: 'TERNARIO',
    ACTUALIZACIONFOR: 'ACTUALIZACIONFOR',
    MODIFICARVAR: 'MODIFICARVAR',
    DECLARARFUNCION: 'DECLARARFUNCION',
    RETURN: 'RETURN',
    LLAMARFUNCION: 'LLAMARFUNCION',
}

module.exports = { Instruccion, tipoInstruccion }