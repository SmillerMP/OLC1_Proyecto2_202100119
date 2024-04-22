 
const { Expresion, TipoDato } = require('../expresion');
let { agregarSalida } = require('../salidas');

class Relacional extends Expresion{
    constructor (izquierda, derecha, operacion, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operacion = operacion;
    }

    interpretar(entorno){

        //console.log(this.izquierda)
        this.izquierda.interpretar(entorno);
        //console.log(this.izquierda)

        //console.log(this.derecha)
        this.derecha.interpretar(entorno);
        //console.log(this.derecha)

        if (this.operacion == "==") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor === this.derecha.valor;  
            return this;

        } else if (this.operacion == "!=") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor !== this.derecha.valor;  
            return this;

        } else if (this.operacion == "<") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor < this.derecha.valor;  
            return this;

        } else if (this.operacion == "<=") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor <= this.derecha.valor; 
            return this;

        } else if (this.operacion == ">") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor > this.derecha.valor;  
            return this;

        } else if (this.operacion == ">=") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor >= this.derecha.valor;  
            return this;

        }

        // Error Semantico
        console.log("Error Semántico: Error en la operacion relacional.")
        agregarSalida("Error Semántico: Error en la operacion relacional.");
        return this;


    }
}


module.exports = Relacional;