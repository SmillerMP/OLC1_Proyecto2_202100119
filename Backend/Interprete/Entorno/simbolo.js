class Simbolo{
    constructor(nombre, valor, tipo, tipoVar, fila, columna){
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.tipoVar = tipoVar;
        this.fila = fila;
        this.columna = columna;
    }

    getNombre(){
        return this.nombre;
    }

    getValor(){
        return this.valor;
    }

    getTipo(){
        return this.tipo;
    }

    getTipoVar(){
        return this.tipoVar;
    }

    getFila(){
        return this.fila;
    }

    getColumna(){
        return this.columna;
    }
    
}

const TipoSimbolo = {
    VARIABLE: 'VARIABLE',
    MATRIZ: 'MATRIZ',
    ARREGLO: 'ARREGLO',
    FUNCION: 'FUNCION'

}

module.exports = {Simbolo, TipoSimbolo};