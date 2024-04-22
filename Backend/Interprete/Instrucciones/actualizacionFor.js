const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoDato } = require('../expresion');
let { agregarSalida } = require('../salidas');

class ActualizacionFor extends Instruccion {
    constructor(id, operador, fila, columna) {
        super(tipoInstruccion.ACTUALIZACIONFOR, fila, columna);
        this.id = id;
        this.operador = operador;
    }

    
    interpretar(entorno) {

        let variable = entorno.getSimbolo(this.id);

        if (variable == null){
            console.log("Error semántico: variable no declarada");
            agregarSalida("Error semántico: variable no declarada");
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