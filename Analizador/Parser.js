var fs = require('fs'); 
var parser = require('./Gramatica');
var dic = require('./Almacenamiento');

fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    parser.parse(data.toString());

    for (var key in dic.diccionario) {
        console.log(key + " : " + dic.diccionario[key] + typeof(dic.diccionario[key]));
    }
        
});



// for (var key in dic.diccionario) {
//     console.log(key + " : " + dic.diccionario[key]);
// }
