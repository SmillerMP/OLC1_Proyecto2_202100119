const { Expresion, TipoDato } = require("../expresion");
const { Simbolo } = require("./simbolo");

const {tipoInstruccion} = require('../instruccion');

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
        if (entornoVar != null){
            while(entornoVar != null){            
                if(!(nombre in entornoVar.tablaSim)){
                    entornoVar = entornoVar.anterior;
                } else {
                    //console.log("recuperacion de variable")
                    return entornoVar.tablaSim[nombre]
                }
            }

            return null;
        } else {
            // error no hay entorno
            return new Expresion("ERROR", TipoDato.ERROR, 0, 0);
        }
    }

    esCiclo(){
        let ent = this;
        while(ent != null){
            if(ent.nombre == tipoInstruccion.WHILE || ent.nombre == tipoInstruccion.FOR || ent.nombre == tipoInstruccion.DO_WHILE){
                return true;
            }
            ent = ent.anterior;
        }
        return false;
    }

    esFuncion(){
        let ent = this;
        while(ent != null){
            if(ent.nombre == tipoInstruccion.FUNCION){
                return true;
            }
            ent = ent.anterior;
        }
        return false;
    }


    addFuncion(nombre, funcion){
        if(nombre in this.tablaFunc){
            // error semantico
            return;
        }
        this.tablaFunc[nombre] = funcion;
    }
    
}


module.exports = Entorno;
