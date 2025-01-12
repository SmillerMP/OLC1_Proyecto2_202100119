const {Expresion} = require('../expresion');
const {TipoDato} = require('../expresion');

class Dato extends Expresion{

    constructor(valor, tipo, fila, columna){
        super(valor, tipo, fila, columna);
    }

    interpretar(entorno){

        //console.log("tipo: " + this.tipo + "  |  valor: " + this.valor)
        //console.log(entorno)

        if (this.tipo == TipoDato.STRING){
            
            //console.log("entra a string")
            //console.log(this.valor)
            if (this.valor.charAt(0) === '"' && this.valor.charAt(this.valor.length - 1) === '"') {
                this.valor = this.valor.slice(1, -1);
            }
        } 

        else if (this.tipo == TipoDato.CHAR){
            if (this.valor.charAt(0) === "'" && this.valor.charAt(this.valor.length - 1) === "'") {
                this.valor = this.valor.slice(1, -1);
                //console.log("entra aqui")
                //console.log("tipo: " + this.tipo + "  |  valor: " + this.valor)
            }
        }

        else if (this.tipo == TipoDato.BOOL) {

            if (String(this.valor).toLowerCase() === "true") {
                this.valor = true;
            }
            else if (String(this.valor).toLowerCase() === "false") {
                this.valor = false;
            }
            
        }
        else if (this.tipo == TipoDato.ENTERO) {
            this.valor = parseInt(this.valor);
        }
        
        else if (this.tipo == TipoDato.DECIMAL) {
            this.valor = parseFloat(this.valor);
        }

        
        return this;
    }

}

module.exports = Dato;