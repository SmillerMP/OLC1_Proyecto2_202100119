const {Instruccion, tipoInstruccion} = require('../instruccion');

class Cout extends Instruccion {
    constructor(expresion, fila, columna) {
        super(tipoInstruccion.COUT, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno) {
        this.expresion.interpretar(entorno);

        console.log("salida: " + this.expresion.valor);
        return this;
        
    }

}

module.exports = Cout;