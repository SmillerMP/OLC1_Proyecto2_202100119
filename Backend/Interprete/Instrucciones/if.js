const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida } = require('../salidas');

class If extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.IF, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {


        //console.log("inicio????????")
        // console.log(this.condicion)
        this.condicion.interpretar(entorno);
        // console.log(this.condicion)
        // console.log("fin????????")


        let entornoIf = new Entorno(tipoInstruccion.IF, entorno)
        //console.log(this.condicion)
        //console.log(this.condicion)
        if (this.condicion.tipo != "BOOL") {
            console.log("Error Semántico: La condición del if no es booleana.")
            agregarSalida("Error Semántico: La condición del if no es booleana.");
            return this;
        }

        if (this.condicion.valor == true){

            //console.log(this.instrucciones);
            /* 
                en el momento que se realiza el console log no se ha ejecutado las instrucciones por lo que el resultado de las instrucciones suele ser un error, debe de pasar por el interprete de primero
            */
            
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                let resultado = instruccion.interpretar(entornoIf);
                

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: break, no está dentro de un ciclo.")        
                        agregarSalida("Error Semántico: break, no está dentro de un ciclo.")            
                        return this;
                    } 
                    return resultado;

                } else if (resultado.tipo == tipoInstruccion.CONTINUE) {
                    if (!entornoIf.esCiclo()) {
                        console.log("Error Semántico: Continue no está dentro de un ciclo.")  
                        agregarSalida("Error Semántico: Continue no está dentro de un ciclo.")                  
                        return this;
                    }
                    return resultado;

                } else if (resultado.tipo == tipoInstruccion.RETURN) {
                    //console.log(instruccion.expresion[0].parametros)

                    //console.log(entornoIf.esFuncion())
                    if (!entornoIf.esFuncion()) {
                        console.log("Error Semántico: return no está dentro de una función.")
                        agregarSalida("Error Semántico: return no está dentro de una función.")

                        return this;
                    }    
                    return resultado;
                
                }
            }

            return this;


            // guardarrrr el entorno
        } else {
            return false;

        }

    }

}

module.exports = If;