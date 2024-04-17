const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class Ternario extends Instruccion {
    constructor(condicion, insTrue, insFalse ,fila, columna) {
        super(tipoInstruccion.TERNARIO, fila, columna);
        this.condicion = condicion;
        this.insTrue = insTrue;
        this.insFalse = insFalse;
    }

    interpretar(entorno) {

        let entornoTernario = new Entorno(tipoInstruccion.TERNARIO, entorno)
        this.condicion.interpretar(entornoTernario);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del if no es booleana.")
            return this;
        }


        if (Boolean(this.condicion.valor)) {

            for (let i = 0; i < this.insTrue.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado == "break") {
                    return "break";
                } else if (resultado == "continue") {
                    continue;
                }              
            }

            return this;
        } else {

            for (let i = 0; i < this.insFalse.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado == "break") {
                    return "break";
                } else if (resultado == "continue") {
                    continue;
                }              
            }

            return this;
        }
    }
}

module.exports = Ternario;