const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoSimbolo } = require("../Entorno/simbolo");
const { TipoDato } = require('../expresion');

class Declaracion extends Instruccion {
    constructor(tipo, id, expresion, fila, columna) {
        super(tipoInstruccion.DECLARACION, fila, columna);
        this.id = id;
        this.tipo = tipo;
        this.expresion = expresion;
    }

    interpretar(entorno) {

        // verifica si la variable se va a declarar con algun valor
        // ejemplo int a; o int a = 5;
        console.log(this.expresion)

        if (this.expresion != null) {

            this.expresion.interpretar(entorno);
            //console.log(this.expresion.interpretar(entorno))


            // Si la variable debe ser entero y el resultado es decimal, debe forzar a entero por redondeo
            if (this.tipo == TipoDato.ENTERO && this.expresion.tipo == TipoDato.DECIMAL) {
                this.expresion.valor = Math.round(this.expresion.valor);
                this.expresion.tipo = TipoDato.ENTERO;
            }

            // verifica que el tipo de dato de la variable sea igual al tipo de dato de la expresion
            console.log(this.expresion)
            if(this.expresion.tipo != this.tipo){
                console.log("Error semántico: Error de tipo de dato en declaracion de variable");
                return this;
            }
        }

        // guardar el simbolo en el entorno
        for (let i = 0; i < this.id.length; i++) {
            entorno.addSimbolo(this.id[i], this.expresion.valor, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);
        }

        return this;
    }

}

module.exports = Declaracion;