const {Expresion, TipoDato} = require('../expresion');
let { agregarSalida, agregarError } = require('../salidas');


class Negacion extends Expresion{

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
        agregarSalida("Error Semántico: Error en la operacion negativo.");
        agregarError("Semántico", "Error en la operacion negativo.", this.fila, this.columna)

        return this;
    }

}   


module.exports = Negacion;