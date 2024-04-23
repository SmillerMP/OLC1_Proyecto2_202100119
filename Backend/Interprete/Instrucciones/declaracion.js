const { Instruccion, tipoInstruccion } = require('../instruccion');
const { TipoSimbolo } = require("../Entorno/simbolo");
const { TipoDato } = require('../expresion');
let { agregarSalida } = require('../salidas');

class Declaracion extends Instruccion {
    constructor(tipo, id, expresion, fila, columna) {
        super(tipoInstruccion.DECLARACION, fila, columna);
        this.id = id;
        this.tipo = tipo;
        this.expresion = expresion;
    }

    interpretar(entorno) {

        // console.log("-------------------------------------------")
        // console.log(this.tipo)
        // console.log(this.id)
        // console.log(this.expresion)
        // console.log(typeof this.expresion == "object")
        // console.log("-------------------------------------------")


        // verifica si la variable se va a declarar con algun valor
        // ejemplo int a; o int a = 5;
        if (typeof this.expresion == "object" && this.expresion != null) {
            //console.log(this.expresion)
            let resultado = this.expresion.interpretar(entorno);
            //console.log(resultado)
            //console.log(this.expresion.interpretar(entorno))

            if (resultado.tipo == tipoInstruccion.RETURN) {


                if (this.id.length != resultado.expresion.length) {
                    console.log("Error semántico: el retorno regresa mas valores de los esperados");
                    agregarSalida("Error semántico: el retorno regresa mas valores de los esperados");
                    return this;
                }

                //console.log(resultado)
                for (let i = 0; i < this.id.length; i++) {

                    if (resultado.tipoVar != this.tipo) {
                        console.log("Error semántico: Error de tipo de dato en declaracion de variable");
                        agregarSalida("Error semántico: Error de tipo de dato en declaracion de variable");
                        return this;
                    }


                    entorno.addSimbolo(this.id[i], resultado.valor, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);
                    //console.log(entorno)

                }
            
                
                return this;

            } else {

                // verifica que el tipo de dato de la variable sea igual al tipo de dato de la expresion
                //console.log(this.expresion)
                if (this.expresion.tipo != this.tipo) {
                    console.log("Error semántico: Error de tipo de dato en declaracion de variable");
                    agregarSalida("Error semántico: Error de tipo de dato en declaracion de variable");
                    return this;
                }

                // guardar el simbolo en el entorno
                //console.log(this.id.length)
                for (let i = 0; i < this.id.length; i++) {
                    entorno.addSimbolo(this.id[i], this.expresion.valor, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);
                    //console.log(entorno)
                }
            }

        } else {

            if (this.expresion == null) {
                if (this.tipo == TipoDato.ENTERO) {
                    this.expresion = 0;

                } else if (this.tipo == TipoDato.DECIMAL) {
                    this.expresion = 0.0;

                } else if (this.tipo == TipoDato.BOOL) {
                    this.expresion = true;

                } else if (this.tipo == TipoDato.STRING) {
                    this.expresion = "";

                } else if (this.tipo == TipoDato.CHAR) {
                    this.expresion = '';
                }
                // guardar el simbolo en el entorno null
            }


            if (Array.isArray(this.id)) {
                for (let i = 0; i < this.id.length; i++) {
                    entorno.addSimbolo(this.id[i], this.expresion, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);
                }

            } else {
                entorno.addSimbolo(this.id, this.expresion, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);
            }

        }



        return this;
    }

}

module.exports = Declaracion;