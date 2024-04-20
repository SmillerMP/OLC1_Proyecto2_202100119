const { TipoDato} = require('../expresion');
const {Instruccion, tipoInstruccion} = require('../instruccion');
const Funcion = require("./funcion");

class DecFuncion extends Instruccion{

    constructor(nombre, retorno, parametros, instrucciones, fila, columna){
        super(tipoInstruccion.FUNCION, fila, columna);
        this.nombre = nombre;
        this.retorno = retorno;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno){
        let funcion = new Funcion(this.nombre, this.retorno, this.parametros, this.instrucciones, fila, columna);
        entorno.addFuncion(this.nombre, funcion);
        return this;
    }
}

module.exports = DecFuncion;