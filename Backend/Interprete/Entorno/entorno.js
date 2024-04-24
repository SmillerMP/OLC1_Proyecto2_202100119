const { Expresion, TipoDato } = require("../expresion");
const { Simbolo } = require("./simbolo");
let { agregarSalida, agregarError, agregarSimbolo } = require('../salidas');
let TablaSimbolo = require('../Reportes/simbolo');

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
            agregarSalida("Error Semántico: La variable " + nombre + " ya ha sido declarada.");
            agregarError("Semántico", "La variable " + nombre + " ya ha sido declarada.", fila, columna);

            return;
        }
        this.tablaSim[nombre] = new Simbolo(nombre, valor, tipo, tipoVar, fila, columna);
        agregarSimbolo(new TablaSimbolo(nombre, tipoVar, tipo, this.nombre, fila, columna));
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
            if(ent.nombre == tipoInstruccion.LLAMARFUNCION){
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

    getFuncion(nombre){
        let entornoFunc = this;
        if (entornoFunc != null){
            while(entornoFunc != null){            
                if(!(nombre in entornoFunc.tablaFunc)){
                    entornoFunc = entornoFunc.anterior;
                } else {
                    //console.log("recuperacion de funcion")
                    //console.log("funcion conseguida en el entorno " + entornoFunc.nombre)
                    return entornoFunc.tablaFunc[nombre]
                }
            }

            return null;
        } else {
            // error no hay entorno
            return new Expresion("ERROR", TipoDato.ERROR, 0, 0);
        }
    }   
    
}


module.exports = Entorno;
