var fs = require('fs'); 
var parser = require('./Gramatica');

fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;

    let resultado = parser.parse(data.toString());


    console.log(resultado);
    // resultado.forEach(instruccion => {
    //     instruccion.interpretar("GLOBAL");
    // });
        
});



// for (var key in dic.diccionario) {
//     console.log(key + " : " + dic.diccionario[key]);
// }
