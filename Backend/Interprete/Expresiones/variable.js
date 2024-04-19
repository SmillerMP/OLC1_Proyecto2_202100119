const {Expresion, TipoDato} = require('../expresion');

class Variable extends Expresion{
    
    constructor(id, vector1, vector2, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.id = id;
        this.vector1 = vector1;
        this.vector2 = vector2;
        this.valor = null;
    }

    interpretar(entorno){

        //console.log(entorno.getSimbolo(this.id))

        // manejo de matrices
        if (this.vector1 != null & this.vector2 != null) {
            if (entorno.getSimbolo(this.id) != null) {
                this.vector1.interpretar(entorno);
                this.vector2.interpretar(entorno);

                if (entorno.getSimbolo(this.id).valor[this.vector1.valor][this.vector2.valor] != null) {
                    this.valor = entorno.getSimbolo(this.id).valor[this.vector1.valor][this.vector2.valor];
                    this.tipo = entorno.getSimbolo(this.id).tipo;
                } else{
                    console.log("Error Semántico: La direccion " + this.id + "[" + this.vector1.valor + "][" + this.vector2.valor + "] no ha sido declarada")
                    this.valor = "ERROR"
                    this.tipo = TipoDato.ERROR;
                }
                     

            } else {
                console.log("Error Semántico: La variable " + this.id + " no ha sido declarada.")
                this.valor = "ERROR"
                this.tipo = TipoDato.ERROR;
            }

        } else if (this.vector1 != null & this.vector2 == null) {

            if (entorno.getSimbolo(this.id) != null) {
                this.vector1.interpretar(entorno);

                if (entorno.getSimbolo(this.id).valor[this.vector1.valor] != null){
                    this.valor = entorno.getSimbolo(this.id).valor[this.vector1.valor];
                    this.tipo = entorno.getSimbolo(this.id).tipo;
                } else {
                    console.log("Error Semántico: La direccion" + this.id + "[" + this.vector1.valor + "] no ha sido declarada")
                    this.valor = "ERROR"
                    this.tipo = TipoDato.ERROR;
                }


            } else {
                console.log("Error Semántico: La variable " + this.id + " no ha sido declarada.")
                this.valor = "ERROR"
                this.tipo = TipoDato.ERROR;
            }

        } else {

            if (entorno.getSimbolo(this.id) != null) {
                this.valor = entorno.getSimbolo(this.id).valor;
                //console.log(this.id)
                
                this.tipo = entorno.getSimbolo(this.id).tipo;

            } else {
                console.log("Error Semántico: La variable " + this.id + " no ha sido declarada.")
                this.valor = "ERROR"
                this.tipo = TipoDato.ERROR;
            }

        }

        return this;

    }

}   


module.exports = Variable ;