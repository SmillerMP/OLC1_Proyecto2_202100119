const {Expresion} = require('../expresion');

class Dato extends Expresion{

    constructor(valor, tipo, fila, columna){
        super(valor, tipo, fila, columna);
    }

    interpretar(entorno){

        if (this.tipo == "STRING") {
            if (this.valor.charAt(0) === '"' && this.valor.charAt(this.valor.length - 1) === '"') {
                this.valor = this.valor.slice(1, -1);
            }
        } 

        if (this.tipo == "BOOL") {
            if (this.valor.charAt(0) === '"' && this.valor.charAt(this.valor.length - 1) === '"') {
                this.valor = this.valor.slice(1, -1);
            }
        }
        return this;
    }

}

module.exports = Dato;