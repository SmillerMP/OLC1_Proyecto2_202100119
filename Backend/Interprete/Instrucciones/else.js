const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class Else extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(tipoInstruccion.ELSE, fila, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoElse = new Entorno(tipoInstruccion.ELSE, entorno)

        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(entornoElse);

            //console.log(instruccion);
        });

    }

}

module.exports = Else;