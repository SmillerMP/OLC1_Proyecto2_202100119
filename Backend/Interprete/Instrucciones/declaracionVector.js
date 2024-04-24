const { Instruccion, tipoInstruccion } = require('../instruccion');
const { TipoSimbolo } = require("../Entorno/simbolo");
const { TipoDato } = require('../expresion');
let { agregarSalida, agregarError } = require('../salidas');


class DeclaracionVec extends Instruccion {
    constructor(tipo, id, tipo2, expresion, fila, columna) {
        super(tipoInstruccion.DECLARACION, fila, columna);
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.id = id;
        this.expresion = expresion;
    }

    interpretar(entorno) {

        // cuando se declara un vector con valores
        if (Array.isArray(this.expresion)) {
            let vector = new Array(this.expresion.length);

            for (let i = 0; i < this.expresion.length; i++) {
                this.expresion[i].interpretar(entorno);
                if (this.tipo != this.expresion[i].tipo) {
                    console.log("Error semántico: existen tipos de datos que no son del tipo del vector");
                    agregarSalida("Error semántico: existen tipos de datos que no son del tipo del vector");
                    agregarError("Semántico", "existen tipos de datos que no son del tipo del vector", this.fila, this.columna);
                    return this;
                }
            }

            for (let i = 0; i < this.expresion.length; i++) {
                vector[i] = this.expresion[i].valor;
            }

            entorno.addSimbolo(this.id, vector, this.tipo, TipoSimbolo.ARREGLO, this.fila, this.columna);


            // declaracion de vector sin valores, solo con tamaño
        } else {

            //console.log(this.tipo, this.tipo2)

            if (this.tipo != this.tipo2) {
                console.log("Error semántico: los tipos de datos no coinciden en la declaracion del vector");
                agregarSalida("Error semántico: los tipos de datos no coinciden en la declaracion del vector");
                agregarError("Semántico", "los tipos de datos no coinciden en la declaracion del vector", this.fila, this.columna);
                return this;
            }


            this.expresion.interpretar(entorno);

            if (this.expresion.tipo != TipoDato.ENTERO || this.expresion.valor < 0) {
                console.log("Error semántico: el tamaño del vector debe ser un entero positivo mayor a 0");
                agregarSalida("Error semántico: el tamaño del vector debe ser un entero positivo mayor a 0");
                agregarError("Semántico", "el tamaño del vector debe ser un entero positivo mayor a 0", this.fila, this.columna);
                return this;
            }

            let vector = new Array(this.expresion.valor);

            entorno.addSimbolo(this.id, vector, this.tipo, TipoSimbolo.ARREGLO, this.fila, this.columna);

        }

    }

}


module.exports = DeclaracionVec;