const { TipoDato } = require('../expresion');
const { Instruccion, tipoInstruccion } = require('../instruccion');
const Funcion = require("./funcion");

class DeclaracionFuncion extends Instruccion {

    constructor(tipoVar, nombre, parametros, instrucciones, retorno, fila, columna) {
        super(tipoInstruccion.DECLARARFUNCION, fila, columna);
        this.tipoVar = tipoVar;
        this.nombre = nombre;
        this.retorno = retorno;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        // console.log("----------->")
        // console.log(this.tipoVar)
        // console.log(this.nombre)
        // console.log(this.parametros)
        // console.log(this.instrucciones)
        // console.log(this.retorno)
        // console.log("----------->")


        let funcion = new Funcion(this.tipoVar, this.nombre, this.retorno, this.parametros, this.instrucciones, this.fila, this.columna);
        entorno.addFuncion(this.nombre, funcion);
        return this;


    }
}

module.exports = DeclaracionFuncion;