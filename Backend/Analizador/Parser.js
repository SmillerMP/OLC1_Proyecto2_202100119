var fs = require('fs'); 
var parser = require('./Gramatica');


fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    parser.parse(data.toString());

        
});



// for (var key in dic.diccionario) {
//     console.log(key + " : " + dic.diccionario[key]);
// }