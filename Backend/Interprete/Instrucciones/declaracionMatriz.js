const { Instruccion, tipoInstruccion } = require('../instruccion');
const { TipoSimbolo } = require("../Entorno/simbolo");
const { TipoDato } = require('../expresion');
let { agregarSalida, agregarError } = require('../salidas');

class DeclaracionMatriz extends Instruccion {
    constructor(tipo, id, tipo2, expresion, expresion2, fila, columna) {
        super(tipoInstruccion.DECLARACION, fila, columna);
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.id = id;
        this.expresion = expresion;
        this.expresion2 = expresion2;
    }

    interpretar(entorno) {

        // cuando se declara una matriz con valores
        if (Array.isArray(this.expresion)) {

            if (this.expresion.length <= 1) {
                console.log("Error semántico: la matriz debe tener al menos 2 dimensiones");
                agregarSalida("Error semántico: la matriz debe tener al menos 2 dimensiones");
                agregarError("Semántico", "la matriz debe tener al menos 2 dimensiones", this.fila, this.columna);
                return this;
            }

            let size2D = this.expresion[0].length;

            // verificacion de datos antes de crear la matriz
            for (let i = 0; i < this.expresion.length; i++) {

                if (size2D != this.expresion[i].length) {
                    console.log("Error semántico: las filas de la matriz deben tener la misma cantidad de columnas");
                    agregarSalida("Error semántico: las filas de la matriz deben tener la misma cantidad de columnas");
                    agregarError("Semántico", "las filas de la matriz deben tener la misma cantidad de columnas", this.fila, this.columna);
                    return this;
                }


                for (let j = 0; j < this.expresion[i].length; j++) {
                    this.expresion[i][j].interpretar(entorno);
                    if (this.tipo != this.expresion[i][j].tipo) {
                        console.log("Error semántico: existen tipos de datos que no son del tipo del vector");
                        agregarSalida("Error semántico: existen tipos de datos que no son del tipo del vector");
                        agregarError("Semántico", "existen tipos de datos que no son del tipo del vector", this.fila, this.columna);
                        return this;
                    }
                }
            }

            // creacion de la matriz
            let matriz = new Array(this.expresion.length);
            for (let i = 0; i < this.expresion.length; i++) {
                let matriz2 = new Array(this.expresion[i].length);
                matriz[i] = matriz2;

                for (let j = 0; j < this.expresion[i].length; j++) {
                    matriz2[j] = this.expresion[i][j].valor;
                }
            }

            //console.log(matriz)
            entorno.addSimbolo(this.id, matriz, this.tipo, TipoSimbolo.MATRIZ, this.fila, this.columna);


            // declaracion de vector sin valores, solo con tamaño
        } else {

            if (this.tipo != this.tipo2) {
                console.log("Error semántico: los tipos de datos no coinciden en la declaracion de la matriz");
                agregarSalida("Error semántico: los tipos de datos no coinciden en la declaracion de la matriz");
                agregarError("Semántico", "los tipos de datos no coinciden en la declaracion de la matriz", this.fila, this.columna);
                return this;
            }

            this.expresion.interpretar(entorno);
            this.expresion2.interpretar(entorno);

            if (this.expresion.tipo != TipoDato.ENTERO || this.expresion.valor < 0) {
                console.log("Error semántico: el tamaño de la matriz debe ser un entero positivo mayor a 0");
                agregarSalida("Error semántico: el tamaño de la matriz debe ser un entero positivo mayor a 0");
                agregarError("Semántico", "el tamaño de la matriz debe ser un entero positivo mayor a 0", this.fila, this.columna);
                return this;

            } else if (this.expresion2.tipo != TipoDato.ENTERO || this.expresion2.valor < 0) {
                console.log("Error semántico: el tamaño 2 de la matriz debe ser un entero positivo mayor a 0");
                agregarSalida("Error semántico: el tamaño 2 de la matriz debe ser un entero positivo mayor a 0");
                agregarError("Semántico", "el tamaño 2 de la matriz debe ser un entero positivo mayor a 0", this.fila, this.columna);
                return this;
            }

            let matriz = new Array(this.expresion.valor);

            for (let i = 0; i < this.expresion.valor; i++) {
                matriz[i] = new Array(this.expresion2.valor);
            }


            entorno.addSimbolo(this.id, matriz, this.tipo, TipoSimbolo.MATRIZ, this.fila, this.columna);

        }

    }

}



module.exports = DeclaracionMatriz;