const {Expresion, TipoDato} = require('../expresion');

class Variable extends Expresion{
    
    constructor(id, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.id = id;
        this.valor = null;
    }

    interpretar(entorno){

        //console.log(entorno.getSimbolo(this.id))

        if (entorno.getSimbolo(this.id) != null) {
            this.valor = entorno.getSimbolo(this.id).valor;
            //console.log(this.id)
            
            this.tipo = entorno.getSimbolo(this.id).tipo;

        } else {
            console.log("Error Semántico: La variable " + this.id + " no ha sido declarada.")
            this.valor = "ERROR"
            this.tipo = TipoDato.ERROR;
        }

        return this;

    }

}   


module.exports = Variable ;