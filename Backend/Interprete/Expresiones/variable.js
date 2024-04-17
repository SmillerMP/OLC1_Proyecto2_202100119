const {Expresion, TipoDato} = require('../expresion');

class Variable extends Expresion{
    
    constructor(id, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.id = id;
        this.valor = null;
    }

    interpretar(entorno){

        if (entorno.getSimbolo(this.id) != null) {
            this.valor = entorno.getSimbolo(this.id).valor;
            //console.log(this.id)
            
            this.tipo = entorno.getSimbolo(this.id).tipo;

        }

        return this;

    }

}   


module.exports = Variable ;