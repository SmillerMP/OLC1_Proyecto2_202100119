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
        //console.log(this.condicion);

        if (variableFor.tipo != TipoDato.ENTERO) {
            console.log("Error Semántico: La variable del for no es de tipo entero.")
            return this;
        }


        // Verifica que la condicion sea posible
        //console.log(this.condicion.interpretar(entornoFor));
        this.condicion.interpretar(entornoFor)
        if (this.condicion.tipo != TipoDato.BOOL) {
            console.log("Error Semántico: La condición del for no es booleana.")
            return this;
        }


        // console.log("Condicion Original")
        // console.log(condicionOriginal)
        
        let salir = false;
        while ( this.condicion.valor == true) {
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoFor);

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
            
            
            //console.log(condicionOriginal)
            //console.log(this.actualizacion);
            this.actualizacion.interpretar(entornoFor);

            //console.log(this.condicion);
            this.condicion.interpretar(entornoFor); 
            
        }

        return this;

    }

}

module.exports = For;