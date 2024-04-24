const Errores = require("./Reportes/errores");

let salidasConsola = [];

function agregarSalida(salida){
    salidasConsola.push(salida);
}

function borrarSalidas(){
    console.log("Borrando salidas")
    salidasConsola = [];
    
}

function obtenerSalidas(){
    return salidasConsola;
}




// Reporte de errores 

let errores = [];


function agregarError(tipo, descripcion, fila, columna){

    errores.push(new Errores(tipo, descripcion, fila, columna));
}

function borrarErrores(){
    errores = [];
}   

function obtenerErrores(){
    return errores;
}





// Reporte de Simbolos
let simbolos = [];

function borrarSimbolos(){
    simbolos = [];
}

function obtenerSimbolos(){
    return simbolos;
}

function agregarSimbolo(simbolo){
    simbolos.push(simbolo);

}


module.exports = {
    agregarSalida,
    borrarSalidas,
    obtenerSalidas,
    agregarError,
    borrarErrores,
    obtenerErrores,
    agregarSimbolo,
    borrarSimbolos,
    obtenerSimbolos
};
