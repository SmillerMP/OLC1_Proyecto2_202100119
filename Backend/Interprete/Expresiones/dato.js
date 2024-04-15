const {Expresion} = require('../expresion');

class Dato extends Expresion{

    constructor(valor, tipo, fila, columna){
        super(valor, tipo, fila, columna);
    }

    interpretar(entorno){

        if (this.tipo == "STRING") {
            this.valor = this.valor.slice(1, -1);
        } 

        if (this.tipo == "BOOL") {
            this.valor = this.valor.slice(1, -1);
        }
        return this;
    }

}

module.exports = Dato;