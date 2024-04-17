const {Instruccion, tipoInstruccion} = require('../instruccion');

class ActualizacionFor extends Instruccion {
    constructor(id, operador, fila, columna) {
        super(tipoInstruccion.ACTUALIZACIONFOR, fila, columna);
        this.id = id;
        this.operador = operador;
    }

    interpretar(entorno) {
        let variable = entorno.getSimbolo(this.id);

        if (this.operador == "+") {
            console.log("entra aqui")
            variable.valor = variable.valor + 1;
            console.log(variable)
            return this;
        }

        else if (this.operador == "-") {
            variable.valor = variable.valor - 1;
            return this;
        }

    }

}

module.exports = ActualizacionFor;