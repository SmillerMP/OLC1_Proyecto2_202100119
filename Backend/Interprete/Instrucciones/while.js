const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida } = require('../salidas');

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
            console.log("Error Semántico: La condición del while no es booleana.")
            agregarSalida("Error Semántico: La condición del while no es booleana.");

            return this;
        }
        

        let salir = false;

        while (this.condicion.valor == true) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                //console.log(instruccion)
                let resultado = instruccion.interpretar(entornoWhile);

                //console.log(resultado)
                if (resultado.tipo ==  tipoInstruccion.BREAK) {
                    salir = true;
                    break;
                } else if (resultado.tipo ==  tipoInstruccion.CONTINUE) {
                    break;
                } else if (resultado.tipo ==  tipoInstruccion.RETURN) {
                    if (!entornoWhile.esFuncion()) {
                        console.log("Error Semántico: return no está dentro de una función.")
                        agregarSalida("Error Semántico: return no está dentro de una función.")

                        return this;
                    }    
                    return resultado;
                }              
            }

            if (salir) {
                break;
            }         
            
            this.condicion.interpretar(entornoWhile);
        }

        return this;

    }

}

module.exports = While;