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

        while (this.condicion.valor.toLowerCase() == "true") {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado.tipo ==  tipoInstruccion.BREAK) {
                    salir = true;
                    break;
                } else if (resultado == "continue") {
                    continue;
                }            
            }
            this.condicion.interpretar(entornoDoWhile);

            if (salir) {
                break;
            }
        }

        return this;

    }

}

module.exports = While;