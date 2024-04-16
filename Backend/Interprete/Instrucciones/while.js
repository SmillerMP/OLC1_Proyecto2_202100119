const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class While extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.WHILE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoWhile = new Entorno(tipoInstruccion.WHILE, entorno)
        this.condicion.interpretar(entornoWhile);

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del if no es booleana.")
            return this;
        }

        let salir = false;

        while (this.condicion.valor.toLowerCase() == "true") {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoWhile);

                //console.log(resultado)
                if (resultado.tipo ==  tipoInstruccion.BREAK) {
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

        return this;

    }

}

module.exports = While;