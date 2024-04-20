const {Instruccion, tipoInstruccion} = require('../instruccion');
const { TipoDato } = require('../expresion');

class ModificarVar extends Instruccion {
    constructor(id, operador, operacion, fila, columna) {
        super(tipoInstruccion.MODIFICARVAR, fila, columna);
        this.id = id;
        this.operador = operador;
        this.operacion = operacion;
    }

    interpretar(entorno) {
        if (Array.isArray(this.id)) {

            for (let i = 0; i < this.id.length; i++) {
                //console.log(entorno.getSimbolo(this.id[i]))
                let variable = entorno.getSimbolo(this.id[i]);                
                let resultadoOperacion = this.operacion.interpretar(entorno);
                let forzarInt = false;

                if (variable == null){
                    console.log("Error semántico: variable no declarada");
                    return this;
                }
                if (variable.tipo != resultadoOperacion.tipo) {

                    if (variable.tipo == TipoDato.ENTERO && resultadoOperacion.tipo == TipoDato.DECIMAL) {
                        forzarInt = true;
                    
                    }else if (variable.tipo == TipoDato.DECIMAL && resultadoOperacion.tipo == TipoDato.ENTERO) {
                        // que se lo pase

                    } else {
                        console.log("Error semántico: Error de tipo de dato en modificación de variable");
                        return this;
                    }               
                }

            
                if (this.operador == "+") {
                    variable.valor += resultadoOperacion.valor;
                } else if (this.operador == "-") {
                    variable.valor -= resultadoOperacion.valor;
                } else if (this.operador == "*") {
                    variable.valor *= resultadoOperacion.valor;
                } else if (this.operador == "/") {
                    variable.valor /= resultadoOperacion.valor;
                } else if (this.operador == "%") {
                    variable.valor %= resultadoOperacion.valor;
                } else if (this.operador == "=") {
                    variable.valor = resultadoOperacion.valor;
                }

                if (forzarInt) {
                    variable.valor = Math.round(variable.valor);
                    console.log("operacion de tipo DECIMAL forazada para ENTERO")
                       
                }
            }
        } else { 

            let forzarInt = false;
            let variable;
            let resultadoOperacion;

            if (this.id.vector1 != null && this.id.vector2 != null) {
                variable = this.id.interpretar(entorno);
                //console.log(variable)
                resultadoOperacion = this.operacion.interpretar(entorno);

                let direccion1 = variable.vector1.valor;
                let direccion2 = variable.vector2.valor;
                let matriz = variable.id
                
                if (variable.tipo == TipoDato.ERROR) {
                    return this;
                }


                if (variable.tipo != resultadoOperacion.tipo) {

                    if (variable.tipo == TipoDato.ENTERO && resultadoOperacion.tipo == TipoDato.DECIMAL) {
                        forzarInt = true;
                    
                    }else if (variable.tipo == TipoDato.DECIMAL && resultadoOperacion.tipo == TipoDato.ENTERO) {
                        // que se lo pase
    
                    } else {
                        console.log("Error semántico: Error de tipo de dato en modificación de variable");
                        return this;
                    }               
                }



                if (this.operador == "+") {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2]+= resultadoOperacion.valor;
                } else if (this.operador == "-") {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2] -= resultadoOperacion.valor;
                } else if (this.operador == "*") {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2] *= resultadoOperacion.valor;
                } else if (this.operador == "/") {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2] /= resultadoOperacion.valor;
                } else if (this.operador == "%") {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2] %= resultadoOperacion.valor;
                } else if (this.operador == "=") {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2] = resultadoOperacion.valor;
                }

                if (forzarInt) {
                    entorno.getSimbolo(matriz).valor[direccion1][direccion2] = Math.round(entorno.getSimbolo(matriz).valor[direccion1][direccion2]);
                    console.log("operacion de tipo DECIMAL forazada para ENTERO")
                    
                }
 

            }

            else if (this.id.vector1 != null && this.id.vector2 == null) {
                variable = this.id.interpretar(entorno);
                //console.log(variable)
                resultadoOperacion = this.operacion.interpretar(entorno);

                let direccion1 = variable.vector1.valor;
                let matriz = variable.id

                if (variable.tipo == TipoDato.ERROR) {
                    return this;
                }


                if (variable.tipo != resultadoOperacion.tipo) {

                    if (variable.tipo == TipoDato.ENTERO && resultadoOperacion.tipo == TipoDato.DECIMAL) {
                        forzarInt = true;
                    
                    }else if (variable.tipo == TipoDato.DECIMAL && resultadoOperacion.tipo == TipoDato.ENTERO) {
                        // que se lo pase

                    } else {
                        console.log("Error semántico: Error de tipo de dato en modificación de variable");
                        return this;
                    }               
                }

                if (this.operador == "+") {
                    entorno.getSimbolo(matriz).valor[direccion1] += resultadoOperacion.valor;
                } else if (this.operador == "-") {
                    entorno.getSimbolo(matriz).valor[direccion1] -= resultadoOperacion.valor;
                } else if (this.operador == "*") {
                    entorno.getSimbolo(matriz).valor[direccion1] *= resultadoOperacion.valor;
                } else if (this.operador == "/") {
                    entorno.getSimbolo(matriz).valor[direccion1] /= resultadoOperacion.valor;
                } else if (this.operador == "%") {
                    entorno.getSimbolo(matriz).valor[direccion1] %= resultadoOperacion.valor;
                } else if (this.operador == "=") {
                    entorno.getSimbolo(matriz).valor[direccion1] = resultadoOperacion.valor;
                }

                if (forzarInt) {
                    entorno.getSimbolo(matriz).valor[direccion1] = Math.round(entorno.getSimbolo(matriz).valor[direccion1]);
                    console.log("operacion de tipo DECIMAL forazada para ENTERO")
                    
                }
 
            }      

        }


        return this;
    }

}

module.exports = ModificarVar;