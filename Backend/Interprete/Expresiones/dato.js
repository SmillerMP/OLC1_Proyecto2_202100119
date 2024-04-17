const {Expresion} = require('../expresion');
const {TipoDato} = require('../expresion');

class Dato extends Expresion{

    constructor(valor, tipo, fila, columna){
        super(valor, tipo, fila, columna);
    }

    interpretar(entorno){

        if (this.tipo == TipoDato.STRING){
            if (this.valor.charAt(0) === '"' && this.valor.charAt(this.valor.length - 1) === '"') {
                this.valor = this.valor.slice(1, -1);
            }
        } 

        else if (this.tipo == TipoDato.BOOL) {

            if (this.valor.toLowerCase() === "true") {
                this.valor = true;
            }
            else if (this.valor.toLowerCase() === "false") {
                this.valor = false;
            }
            
        }
        else if (this.tipo == TipoDato.ENTERO) {
            this.valor = parseInt(this.valor);
        }
        
        else if (this.tipo == TipoDato.DECIMAL) {
            this.valor = parseFloat(this.valor);
        }


        else if (this.tipo == "ID") {
            // busca los valores de las variables y cambia el tipo al del valor de la variable y el valor
            this.tipo = entorno.getSimbolo(this.valor).tipo;
            this.valor = entorno.getSimbolo(this.valor).valor;
            
        }

        
        return this;
    }

}

module.exports = Dato;