const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoSimbolo } = require("../Entorno/simbolo");
const { TipoDato } = require('../expresion');

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
                    forzarNumero(i)
                }
            }

            for (let i = 0; i < this.expresion.length; i++) {
                vector[i] = this.expresion[i].valor;
            }

            entorno.addSimbolo(this.id, vector, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);


        // declaracion de vector sin valores, solo con tamaño
        } else {

            if (this.tipo != this.tipo2) {
                console.log("Error semántico: los tipos de datos no coinciden en la declaracion del vector");
                return this;
            }

            
            this.expresion.interpretar(entorno);

            if (this.expresion.tipo != TipoDato.ENTERO || this.expresion.valor < 0){
                console.log("Error semántico: el tamaño del vector debe ser un entero positivo mayor a 0");
                return this;
            }

            let vector = new Array(this.expresion.valor);

            entorno.addSimbolo(this.id, vector, this.tipo, TipoSimbolo.VARIABLE, this.fila, this.columna);

        }

    }

}


function forzarNumero(valor) {
    if (this.tipo == TipoDato.ENTERO && this.expresion[valor].tipo == TipoDato.DECIMAL) {
        this.expresion[valor].valor = Math.round(this.expresion[valor].valor);
        this.expresion[valor].tipo = TipoDato.ENTERO;

    } else if (this.tipo == TipoDato.DECIMAL && this.expresion[valor].tipo == TipoDato.ENTERO) {
        this.expresion[valor].valor = parseFloat(this.expresion[valor].valor);
        this.expresion[valor].tipo = TipoDato.DECIMAL;
    
    } else {
    console.log("Error semántico: existen tipos de datos que no son del tipo del vector");
    return this;
    }
}


module.exports = DeclaracionVec;