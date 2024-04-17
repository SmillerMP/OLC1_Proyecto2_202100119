const {Instruccion, tipoInstruccion} = require('../instruccion');

class Cout extends Instruccion {
    constructor(expresion, fila, columna) {
        super(tipoInstruccion.COUT, fila, columna);
        this.expresion = expresion;
    }

    interpretar(entorno) {
        
        let salida = "";
        for (let i = 0; i < this.expresion.length; i++) {
            let resultado = this.expresion[i].interpretar(entorno)
            salida += String(resultado.valor);
        }

        console.log("salida: " + salida);
        return this;
        
    }

}

module.exports = Cout;