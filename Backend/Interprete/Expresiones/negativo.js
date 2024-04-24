const {Expresion, TipoDato} = require('../expresion');
let { agregarSalida, agregarError } = require('../salidas');

class Negativo extends Expresion{
    
    constructor(expresion, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno){

        this.expresion.interpretar(entorno);

        if(this.expresion.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.ENTERO;
            this.valor = -1 * this.expresion.valor;
            return this;

        } else if (this.expresion.tipo === TipoDato.DECIMAL){
            this.tipo = TipoDato.DECIMAL;
            this.valor = -1 * this.expresion.valor;
            return this;

        }

        // Error Semantico
        console.log("Error Semántico: Error en la operacion negativo.")
        agregarSalida("Error Semántico: Error en la operacion negativo.");
        agregarError("Semántico", "Error en la operacion negativo.", this.fila, this.columna)
        return this;
    }

}   


module.exports = Negativo ;