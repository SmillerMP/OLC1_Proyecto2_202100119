 
const { Expresion, TipoDato } = require('../expresion');
let { agregarSalida, agregarError } = require('../salidas');

class opLogicos extends Expresion{
    constructor (izquierda, derecha, operacion, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operacion = operacion;
    }

    interpretar(entorno){
        this.izquierda.interpretar(entorno);
        this.derecha.interpretar(entorno);

        if (this.operacion == "&&") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor && this.derecha.valor;  
            return this;

        } else if (this.operacion == "||") {
            this.tipo = TipoDato.BOOL;
            this.valor = this.izquierda.valor || this.derecha.valor;  
            return this;

        
        }
        // Error Semantico
        console.log("Error Semántico: Error en la operacion relacional.")
        agregarSalida("Error Semántico: Error en la operacion relacional.");
        agregarError("Semántico", "Error en la operacion relacional.", this.fila, this.columna)
        return this;


    }
}


module.exports = opLogicos;