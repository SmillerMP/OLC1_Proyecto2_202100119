class Expresion{

    constructor(valor, tipo, fila, columna){
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno){}

}

const TipoDato = {
    ENTERO: 'ENTERO',
    DECIMAL: 'DECIMAL',
    BOOL: 'BOOL',
    CHAR: 'CHAR',
    STRING: 'STRING',
    ID: 'ID',
    ERROR: 'ERROR'
}

module.exports = {Expresion, TipoDato}