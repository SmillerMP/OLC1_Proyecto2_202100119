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

module.exports = {
    agregarSalida,
    borrarSalidas,
    obtenerSalidas
};