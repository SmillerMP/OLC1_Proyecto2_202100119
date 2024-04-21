const { TipoDato} = require('../expresion');
const {Instruccion, tipoInstruccion} = require('../instruccion');
const Funcion = require("./funcion");

class DeclaracionFuncion extends Instruccion{

    constructor(tipoVar, nombre, parametros, instrucciones, retorno, fila, columna){
        super(tipoInstruccion.FUNCION, fila, columna);
        this.tipoVar = tipoVar;
        this.nombre = nombre;
        this.retorno = retorno;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno){

        if (this.tipoVar != null) {

            let funcion = new Funcion(this.nombre, this.retorno, this.parametros, this.instrucciones, this.fila, this.columna);
            entorno.addFuncion(this.nombre, funcion);
            return this;

        }
    }
}

module.exports = DeclaracionFuncion;