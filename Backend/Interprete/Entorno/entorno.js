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
            console.log("Semantico: Variable ya declarada");
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
            return entornoVar.tablaSim[nombre]
        }

        console.log("Semantico: Variable no declarada");
        return new Expresion("ERROR", TipoDato.ERROR, 0, 0);
    }
    
}


module.exports = Entorno;
