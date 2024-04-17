const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
const { TipoDato } = require('../expresion');

class For extends Instruccion {
    constructor(variable, condicion, actualizacion, instrucciones, fila, columna) {
        super(tipoInstruccion.WHILE, fila, columna);
        this.variable = variable;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        let entornoFor = new Entorno(tipoInstruccion.FOR, entorno)

        let variableFor = this.variable.interpretar(entornoFor);

        if (variableFor.tipo != TipoDato.ENTERO) {
            console.log("Error Semántico: La variable del for no es de tipo entero.")
            return this;
        }


        // Verifica que la condicion sea posible
        this.condicion.interpretar(entornoFor);
        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del for no es booleana.")
            return this;
        }

        while ( this.condicion.valor.toLowerCase() == "true") {
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
            
            this.actualizacion.interpretar(entornoFor);
            this.condicion.interpretar(entornoFor);
        }

        return this;

    }

}

module.exports = For;