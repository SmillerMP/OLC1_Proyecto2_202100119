const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class While extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.DOWHILE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoDoWhile = new Entorno(tipoInstruccion.DOWHILE, entorno)
        this.condicion.interpretar(entornoDoWhile);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del do while no es booleana.")
            return this;
        }



        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            let resultado = instruccion.interpretar(entornoDoWhile);

            if (resultado == "break") {
                break;
            } else if (resultado == "continue") {
                continue;
            }              
        }

        let salir = false;
        if (Boolean(this.condicion.valor)) {
            while (Boolean(this.condicion.valor)) {
                for (let i = 0; i < this.instrucciones.length; i++) {
                    const instruccion = this.instrucciones[i];
                    let resultado = instruccion.interpretar(entornoDoWhile);

                    if (resultado == "break") {
                        salir = true;
                        break;
                    } else if (resultado == "continue") {
                        continue;
                    }              
                }

                if (salir) {
                    break;
                }
            }

            return true;
        } else {
            // la codicion no se cumple
            return false;

        }

    }

}

module.exports = While;