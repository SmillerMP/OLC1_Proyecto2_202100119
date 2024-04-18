const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const analizador = require("../Analizador/Gramatica.js");
const entorno = require("../Interprete/Entorno/entorno.js");




// Creacion de la API
const app = express();


// Salida al puerto
app.set('port', 8000);


// Modulos
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



// Login de los usuarios
app.get('/Login', (req, res) => {
    res.status(200).json({nombre: "Hola Mundo"});
})


app.post('/Analizar', (req, res) => {
    const entrada = req.body.entrada;
    // Analizador Sintactico y lexico
    let resultado = analizador.parse(entrada);
    
    let entornoGlobal = new entorno("GLOBAL", null);

    //console.log(resultado)
    if (resultado != ""){
        resultado.forEach(instruccion => {
            instruccion.interpretar(entornoGlobal);
        });
    }


    console.log(entornoGlobal);

    

    //console.log(resultado);

    res.status(200).json({resultado: resultado});
    console.error('\x1b[31m%s\x1b[0m', ' --------------------------- Ejecucion terminada ----------------------------------\n\n');
});




// Enviando en que puerto salen los datas
app.listen(app.get('port'), () => {
    console.clear();
    console.log('Servidor iniciado en el puerto:  8000 ');
});