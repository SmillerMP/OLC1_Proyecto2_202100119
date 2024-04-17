const { Expresion, TipoDato } = require("../expresion");
const { Simbolo } = require("./simbolo");

class Entorno{
    constructor(nombre, anterior){
        this.nombre = nombre;
        this.anterior = anterior;
        this.tablaSim = {};
        this.tablaFunc = {};
        //this.tablaSim[nombre] = Simbolo()
         
    }

    addSimbolo(nombre, valor, tipo, tipoVar, fila, columna){
        if(nombre in this.tablaSim){
            console.log("Error Semántico: La variable " + nombre + " ya ha sido declarada.");
            return;
        }
        this.tablaSim[nombre] = new Simbolo(nombre, valor, tipo, tipoVar, fila, columna);
    }

    getSimbolo(nombre){
        let entornoVar = this;
        while(entornoVar != null){
            if(!(nombre in entornoVar.tablaSim)){
                entornoVar = entornoVar.anterior;
            }

            if (entornoVar == null){ 
                console.log("Error Semántico: La variable " + nombre + " no ha sido declarada.");
                return new Expresion("ERROR", TipoDato.ERROR, 0, 0);
            } else {
                return entornoVar.tablaSim[nombre]
            }

        }
    }
    
}


module.exports = Entorno;
