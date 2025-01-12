 
const { Expresion, TipoDato } = require('../expresion');
let { agregarSalida, agregarError } = require('../salidas');

class Aritmetica extends Expresion{
    constructor (izquierda, derecha, operacion, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operacion = operacion;
    }

    interpretar(entorno){

        this.izquierda.interpretar(entorno);
        this.derecha.interpretar(entorno);

        if (this.operacion == "+") {
            // MANEJO DE ENTERO
            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this; 

            }


            // MANEJO DE DECIMAL
            else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor.charCodeAt(0));
                return this;

            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = Number(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }


            // MANEJO DE BOOL
            else if (this.izquierda.tipo == TipoDato.BOOL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.BOOL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.BOOL && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }


            // MANEJO DE CHAR
            else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }


            // MANEJO DE STRING
            else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }
            

            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Suma");
            agregarSalida("Error Semantico: los tipos no son validos operacion Suma");
            agregarError("Semántico", "los tipos no son validos operacion Suma", this.fila, this.columna);
            return this;
        
        
        // OPERACION RESTA
        } else if (this.operacion == "-") {
            // MANEJO DE ENTERO
            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE DECIMAL
            else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE BOOL
            else if (this.izquierda.tipo == TipoDato.BOOL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.BOOL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            }


            // MANEJO DE CHAR
            else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) - Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) - Number(this.derecha.valor);
                return this;
            
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Resta");
            agregarSalida("Error Semantico: los tipos no son validos operacion Resta");
            agregarError("Semántico", "los tipos no son validos operacion Resta", this.fila, this.columna);
            return this;
        }

        else if (this.operacion == "*") {
            // MANEJO DE ENTERO
            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE DECIMAL
            else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE CHAR
            else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) * Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) * Number(this.derecha.valor);
                return this;
            
            }
        
            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Multiplicacion");
            agregarSalida("Error Semantico: los tipos no son validos operacion Multiplicacion");
            agregarError("Semántico", "los tipos no son validos operacion Multiplicacion", this.fila, this.columna);
            return this;
        }

        // OPERACION DIVISION
        else if (this.operacion == "/") {
            // MANEJO DE ENTERO

            if (this.derecha.valor == 0) {
                console.log("Error Semantico: Division por 0");
                agregarSalida("Error Semantico: Division por 0");
                agregarError("Semántico", "Division por 0", this.fila, this.columna);
                return this;
            }

            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }

            // MANEJO DE DECIMAL
            else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor.charCodeAt(0));
                return this;
            }


            // MANEJO DE CHAR
            else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) / Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) / Number(this.derecha.valor);
                return this;
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Division");
            agregarSalida("Error Semantico: los tipos no son validos operacion Division");
            agregarError("Semántico", "los tipos no son validos operacion Division", this.fila, this.columna);
            return this;
        }

        // OPERACION POTENCIA
        else if (this.operacion == "pow"){
            // MANEJO DE ENTERO
            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            }


            // MANEJO DE DECIMAL
            else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Potencia");
            agregarSalida("Error Semantico: los tipos no son validos operacion Potencia");
            agregarError("Semántico", "los tipos no son validos operacion Potencia", this.fila, this.columna);
            return this;

        }

        // OPERACION MODULO
        else if (this.operacion == "%"){
            //MANEJO DE ENTERO
            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.ENTERO;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            }


            // MANEJO DE DECIMAL
            else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.DECIMAL && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Modulo");
            agregarSalida("Error Semantico: los tipos no son validos operacion Modulo");
            agregarError("Semántico", "los tipos no son validos operacion Modulo", this.fila, this.columna);
            return this;

        }




    }
}


module.exports = Aritmetica;