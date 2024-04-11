 
const { Expresion, TipoDato } = require('./expresion');

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
            // MANEJO DE INT
            if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            } else if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.CADENA) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this; 

            }


            // MANEJO DE DOUBLE
            else if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor.charCodeAt(0));
                return this;

            } else if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.CADENA) {
                this.tipo = TipoDato.CADENA;
                this.valor = Number(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }


            // MANEJO DE BOOLEAN
            else if (this.izquierda.tipo == TipoDato.BOOLEAN && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.BOOLEAN && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.BOOLEAN && this.derecha.tipo == TipoDato.CADENA) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }


            // MANEJO DE CHAR
            else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) + Number(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.CADENA) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }


            // MANEJO DE CADENA
            else if (this.izquierda.tipo == TipoDato.CADENA && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CADENA && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CADENA && this.derecha.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CADENA && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            } else if (this.izquierda.tipo == TipoDato.CADENA && this.derecha.tipo == TipoDato.CADENA) {
                this.tipo = TipoDato.CADENA;
                this.valor = String(this.izquierda.valor) + String(this.derecha.valor);
                return this;

            }
            

            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Suma");
            return this;
        
        
        // OPERACION RESTA
        } else if (this.operacion == "-") {
            // MANEJO DE INT
            if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE DOUBLE
            if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.BOOLEAN) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE BOOLEAN
            if (this.izquierda.tipo == TipoDato.BOOLEAN && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.BOOLEAN && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) - Number(this.derecha.valor);
                return this;
            
            }


            // MANEJO DE CHAR
            if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) - Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) - Number(this.derecha.valor);
                return this;
            
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Resta");
            return this;
        }

        else if (this.operacion == "*") {
            // MANEJO DE INT
            if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE DOUBLE
            if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) * Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }


            // MANEJO DE CHAR
            if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) * Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) * Number(this.derecha.valor);
                return this;
            
            }
        
            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Multiplicacion");
            return this;
        }

        // OPERACION DIVISION
        else if (this.operacion == "/") {
            // MANEJO DE INT
            if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor.charCodeAt(0));
                return this;
            
            }

            // MANEJO DE DOUBLE
            if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) / Number(this.derecha.valor.charCodeAt(0));
                return this;
            }


            // MANEJO DE CHAR
            if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) / Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.CHAR && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor.charCodeAt(0)) / Number(this.derecha.valor);
                return this;
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Division");
            return this;
        }

        // OPERACION POTENCIA
        else if (this.operacion == "pow"){
            // MANEJO DE INT
            if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.INT;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            }


            // MANEJO DE DOUBLE
            if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(Number(this.izquierda.valor), Number(this.derecha.valor));
                return this;
            
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Potencia");
            return this;

        }

        // OPERACION MODULO
        else if (this.operacion == "%"){
            //MANEJO DE INT
            if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.INT && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            }


            // MANEJO DE DOUBLE
            if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.INT) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            } if (this.izquierda.tipo == TipoDato.DOUBLE && this.derecha.tipo == TipoDato.DOUBLE) {
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izquierda.valor) % Number(this.derecha.valor);
                return this;
            
            }


            // Error Semantico
            console.log("Error Semantico: los tipos no son validos operacion Modulo");
            return this;

        }




    }
}