const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida } = require('../salidas');

class DoWhile extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.DOWHILE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoDoWhile = new Entorno(tipoInstruccion.DOWHILE, entorno)

        // verificacion de break, continue y dentro de un ciclo
        // y verificacion de return dentro de una funcion
    
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            let resultado = instruccion.interpretar(entornoDoWhile);

            if (resultado.tipo ==  tipoInstruccion.BREAK) {
                break;
            } else if (resultado.tipo ==  tipoInstruccion.CONTINUE) {
                break;
            } else if (resultado.tipo ==  tipoInstruccion.RETURN) {
                if (!entornoDoWhile.esFuncion()) {
                    console.log("Error Semántico: return no está dentro de una función.")
                    agregarSalida("Error Semántico: return no está dentro de una función.")

                    return this;
                }    
                return resultado;
            }            
        }
        

        //console.log(this.condicion)
        this.condicion.interpretar(entornoDoWhile);
        //console.log(this.condicion)

        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del do while no es booleana.")
            agregarSalida("Error Semántico: La condición del do while no es booleana.");

            return this;
        }

        let salir = false;

        while (this.condicion.valor == true) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoDoWhile);

                if (resultado.tipo ==  tipoInstruccion.BREAK) {
                    salir = true;
                    break;
                } else if (resultado.tipo ==  tipoInstruccion.CONTINUE) {
                    break;
                } else if (resultado.tipo ==  tipoInstruccion.RETURN) {
                    if (!entornoDoWhile.esFuncion()) {
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
            this.condicion.interpretar(entornoDoWhile);
        }

        return this;

    }

}

module.exports = DoWhile;