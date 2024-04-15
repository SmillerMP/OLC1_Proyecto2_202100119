const {Expresion, TipoDato} = require('../expresion');

class FuncionCout extends Expresion {
    constructor(tipoFuncion, expresion, fila, columna) {
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.tipoFuncion = tipoFuncion;
        this.expresion = expresion;
    }

    interpretar(entorno) {

        this.expresion = this.expresion.interpretar(entorno);
        this.tipoFuncion = this.tipoFuncion.toLowerCase();
        
        if (this.tipoFuncion == "toupper") {
            if (this.expresion.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = this.expresion.valor.toUpperCase();
                return this;
            } else {
                console.log("Error: El valor ingresado no es de tipo string");
                return this;
            }
        } 
        
        // Funcion to lower
        else if (this.tipoFuncion == "tolower") {
            if (this.expresion.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = this.expresion.valor.toLowerCase();
                return this;
            } else {
                console.log("Error: El valor ingresado no es de tipo string");
                return this;
            }

        } 

        // Funcion round
        else if (this.tipoFuncion == "round") {
            if (this.expresion.tipo == TipoDato.ENTERO || this.expresion.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Math.round(this.expresion.valor);
                return this;
            } else {
                console.log("Error: El valor ingresado no es de tipo entero o decimal");
                return this;
            }
        }

        // Funcion para convertir en string
        else if (this.tipoFuncion == "tostring") {
            this.tipo = TipoDato.STRING;
            this.valor = this.expresion.valor.toString();
            return this;       
        }



        return this;
    }

}

module.exports = FuncionCout;