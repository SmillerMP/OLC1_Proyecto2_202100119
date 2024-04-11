 
const { Expresion, TipoDato } = require('../expresion');

class Aritmetica extends Expresion{
    constructor (izquierda, derecha, operacion, fila, columna){
        super("Error", TipoDato.ERROR, fila, columna);
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
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor).replace(/["]/g, '');
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
                this.valor = Number(this.izquierda.valor) + String(this.derecha.valor).replace(/["]/g, '');
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
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor).replace(/["]/g, '');
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
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor).replace(/["']/g, '');
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor).replace(/["]/g, '');
                return this;

            }


            // MANEJO DE STRING
            else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor).replace(/["']/g, '');
                return this;

            } else if (this.izquierda.tipo == TipoDato.STRING && this.derecha.tipo == TipoDato.STRING) {
                this.tipo = TipoDato.STRING;
                this.valor = String(this.izquierda.valor).replace(/["']/g, '') + String(this.derecha.valor).replace(/["']/g, '');
                return this;

            }
            

            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Suma");
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
            return this;
        }

        // OPERACION DIVISION
        else if (this.operacion == "/") {
            // MANEJO DE ENTERO
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
            return this;

        }

        // OPERACION MODULO
        else if (this.operacion == "%"){
            //MANEJO DE ENTERO
            if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.ENTERO && this.derecha.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
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
            return this;

        }




    }
}


module.exports = Aritmetica;