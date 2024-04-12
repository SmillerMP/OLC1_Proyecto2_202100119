const {Expresion, TipoDato} = require('../expresion');

class Negativo extends Expresion{

    constructor(operacion, derecha, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.operacion = operacion;
        this.derecha = derecha;
    }

    interpretar(entorno){

        this.derecha.interpretar(entorno);

        if(this.expresion == "!"){
            this.tipo = TipoDato.BOOL;
            this.valor = !this.derecha.valor;
            return this;
        }
        
        // Error Semantico
        console.log("Error Semántico: Error en la operacion negativo.")
        return this;
    }

}   


module.exports = Negativo ;