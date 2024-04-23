const { TipoDato } = require('../expresion');
const { Instruccion, tipoInstruccion } = require("../instruccion");


class Return extends Instruccion{
    constructor(expresion, fila, columna){
        super(tipoInstruccion.RETURN, fila, columna);
        this.expresion = expresion;
        this.valor = null;
    }

    interpretar(entorno){

        // console.log("------------------------------>")
        // if (this.expresion[0].tipo == tipoInstruccion.LLAMARFUNCION){
        //     console.log(this.expresion[0].parametros)
        // }
        // console.log("------------------------------>")

        let arreglo = []

        if (this.expresion != null) {

            if (Array.isArray(this.expresion)) {

                if (this.expresion.length == 1){
                    this.valor = this.expresion[0].interpretar(entorno).valor;
                    return this;

                }
                for (let i = 0; i < this.expresion.length; i++) {
                    const element = this.expresion[i];
                    arreglo.push(element.interpretar(entorno).valor);
                }
                this.valor = arreglo;
                return this;
            } else {
                //console.log(this.expresion)
                this.valor = this.expresion.interpretar(entorno).valor;
                return this;
            }
        }

        return this;
    }
}

module.exports = Return;