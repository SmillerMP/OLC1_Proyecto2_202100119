const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoDato } = require('../expresion');

class ModificarVar extends Instruccion {
    constructor(id, operador, operacion, fila, columna) {
        super(tipoInstruccion.MODIFICARVAR, fila, columna);
        this.id = id;
        this.operador = operador;
        this.operacion = operacion;
    }

    interpretar(entorno) {
        if (Array.isArray(this.id)) {

            for (let i = 0; i < this.id.length; i++) {
                let variable = entorno.getSimbolo(this.id[i]);                
                let resultadoOperacion = this.operacion.interpretar(entorno);
                let forzarInt = false;

                if (variable.tipo != resultadoOperacion.tipo) {

                    if (variable.tipo == TipoDato.ENTERO && resultadoOperacion.tipo == TipoDato.DECIMAL) {
                        forzarInt = true;
                    } else {
                        console.log("Error semántico: Error de tipo de dato en modificación de variable");
                        return this;
                    }               
                }

            
                if (this.operador == "+") {
                    variable.valor += resultadoOperacion.valor;
                } else if (this.operador == "-") {
                    variable.valor -= resultadoOperacion.valor;
                } else if (this.operador == "*") {
                    variable.valor *= resultadoOperacion.valor;
                } else if (this.operador == "/") {
                    variable.valor /= resultadoOperacion.valor;
                } else if (this.operador == "%") {
                    variable.valor %= resultadoOperacion.valor;
                } else if (this.operador == "=") {
                    variable.valor = resultadoOperacion.valor;
                }

                if (forzarInt) {
                    variable.valor = Math.round(variable.valor);
                    console.log("operacion de tipo DECIMAL forazada para ENTERO")
                       
                }
            }
        }

        return this;
    }

}

module.exports = ModificarVar;