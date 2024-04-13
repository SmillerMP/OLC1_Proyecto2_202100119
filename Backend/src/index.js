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

    resultado.forEach(instruccion => {
        instruccion.interpretar(entornoGlobal);
    });

    //console.log(resultado);

    res.status(200).json({resultado: resultado});
});




// Enviando en que puerto salen los datas
app.listen(app.get('port'), () => {
    console.error('\x1b[31m%s\x1b[0m', ' --------------------------------------------------------------------');
    console.log('Servidor iniciado en el puerto:  8000 ');
});