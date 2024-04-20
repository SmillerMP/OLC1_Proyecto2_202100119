const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoDato } = require('../expresion');

class ActualizacionFor extends Instruccion {
    constructor(id, operador, fila, columna) {
        super(tipoInstruccion.ACTUALIZACIONFOR, fila, columna);
        this.id = id;
        this.operador = operador;
    }

    interpretar(entorno) {
        let variable = this.id.interpretar(entorno);

        if (variable.tipo ==  TipoDato.ERROR){
            return this;
        }

        if (this.operador == "+") {
            variable.valor = variable.valor + 1;
            //onsole.log(variable);
            return this;
        }

        else if (this.operador == "-") {
            variable.valor = variable.valor - 1;
            return this;
        }

    }

}

module.exports = ActualizacionFor;