const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class DoWhile extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.DOWHILE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoDoWhile = new Entorno(tipoInstruccion.DOWHILE, entorno)

        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            let resultado = instruccion.interpretar(entornoDoWhile);

            if (resultado.tipo ==  tipoInstruccion.BREAK || resultado.tipo ==  tipoInstruccion.CONTINUE) {
                break;
            }           
        }

        let salir = false;

        //console.log(this.condicion)
        this.condicion.interpretar(entornoDoWhile);
        //console.log(this.condicion)

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del do while no es booleana.")
            return this;
        }

        while (this.condicion.valor == true) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado.tipo ==  tipoInstruccion.BREAK) {
                    salir = true;
                    break;
                } else if (resultado.tipo ==  tipoInstruccion.CONTINUE) {
                    break;
                }            
            }
            

            if (salir) {
                break;
            }
            this.condicion.interpretar(entornoDoWhile);
        }

        return this;

    }

}

module.exports = DoWhile;