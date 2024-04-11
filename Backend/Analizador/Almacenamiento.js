
var diccionario = {};

function almacenar(nombre , valor) {
    diccionario[nombre] = valor;
}


module.exports = {
    diccionario: diccionario, 
    almacenar: almacenar
};