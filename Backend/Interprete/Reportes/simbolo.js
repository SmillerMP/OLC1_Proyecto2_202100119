class TablaSimbolo{
    constructor(nombre, tipoSimbolo, tipoVar, entorno, fila, columna){
        this.nombre = nombre;
        this.tipoSimbolo = tipoSimbolo;
        this.tipoVar = tipoVar;
        this.entorno = entorno;
        this.fila = fila;
        this.columna = columna;
    }

    getNombre(){
        return this.nombre;
    }   

    getTipoSimbolo(){
        return this.tipoSimbolo;
    }

    getTipoVar(){
        return this.tipoVar;
    }   

    getEntorno(){
        return this.entorno;
    }   

    getFila(){
        return this.fila;
    }   

    getColumna(){
        return this.columna;
    }   


    
}

module.exports = TablaSimbolo;