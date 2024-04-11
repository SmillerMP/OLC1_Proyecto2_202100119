 
const { Expresion, TipoDato } = require('../expresion');

class opLogicos extends Expresion{
    constructor (izquierda, derecha, operacion, fila, columna){
        super("Error", TipoDato.ERROR, fila, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operacion = operacion;
    }

    interpretar(entorno){
        this.izquierda.interpretar(entorno);
        this.derecha.interpretar(entorno);

        // Error Semantico
        console.log("Error Semántico: Error en la operacion relacional.")
        return this;


    }
}


module.exports = opLogicos;