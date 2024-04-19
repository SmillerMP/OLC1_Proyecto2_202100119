const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoSimbolo } = require("../Entorno/simbolo");
const { TipoDato } = require('../expresion');

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
                return this;
            }

            let size2D = this.expresion[0].length;

            // verificacion de datos antes de crear la matriz
            for (let i = 0; i < this.expresion.length; i++) {

                if (size2D != this.expresion[i].length) { 
                    console.log("Error semántico: las filas de la matriz deben tener la misma cantidad de columnas");
                    return this;
                }
                

                for (let j = 0; j < this.expresion[i].length; j++) {
                    this.expresion[i][j].interpretar(entorno);
                    if (this.tipo != this.expresion[i][j].tipo) {
                        forzarNumero(i, j)
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
            entorno.addSimbolo(this.id, matriz, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);


        // declaracion de vector sin valores, solo con tamaño
        } else {

            if (this.tipo != this.tipo2) {
                console.log("Error semántico: los tipos de datos no coinciden en la declaracion de la matriz");
                return this;
            }

            this.expresion.interpretar(entorno);
            this.expresion2.interpretar(entorno);

            if (this.expresion.tipo != TipoDato.ENTERO || this.expresion.valor < 0){
                console.log("Error semántico: el tamaño de la matriz debe ser un entero positivo mayor a 0");
                return this;

            } else if (this.expresion2.tipo != TipoDato.ENTERO || this.expresion2.valor < 0){
                console.log("Error semántico: el tamaño 2 de la matriz debe ser un entero positivo mayor a 0");
                return this;
            }

            let matriz = new Array(this.expresion.valor);

            for (let i = 0; i < this.expresion.valor; i++) {
                matriz[i] = new Array(this.expresion2.valor);
            }


            entorno.addSimbolo(this.id, matriz, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);

        }

    }

}

function forzarNumero(valor, valor2) {
    if (this.tipo == TipoDato.ENTERO && this.expresion[valor][valor2].tipo == TipoDato.DECIMAL) {
        this.expresion[valor][valor2].valor = Math.round(this.expresion[valor][valor2].valor);
        this.expresion[valor][valor2].tipo = TipoDato.ENTERO;

    } else if (this.tipo == TipoDato.DECIMAL && this.expresion[valor][valor2].tipo == TipoDato.ENTERO) {
        this.expresion[valor][valor2].valor = parseFloat(this.expresion[valor][valor2].valor);
        this.expresion[valor][valor2].tipo = TipoDato.DECIMAL;
    
    } else {
    console.log("Error semántico: existen tipos de datos que no son del tipo del vector");
    return this;
    }
}



module.exports = DeclaracionMatriz;