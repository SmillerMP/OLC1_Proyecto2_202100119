const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const analizador = require("../Analizador/Gramatica.js");
const entorno = require("../Interprete/Entorno/entorno.js");
let { borrarSalidas, obtenerSalidas, agregarSalida}  = require("../Interprete/salidas.js");




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
    borrarSalidas();
    const entrada = req.body.entrada;
    // Analizador Sintactico y lexico


    let resultado = analizador.parse(entrada);
    
    let entornoGlobal = new entorno("GLOBAL", null);

    encontrado = false;

    let posicion = 0;

    for (let i = 0; i < resultado.length; i++) {
        if (resultado[i].tipo == "EXECUTE") {
            encontrado = true;
            posicion = i;      
            continue;      
        }
        resultado[i].interpretar(entornoGlobal);
    }

    //console.log(encontrado)
    if (encontrado) {
        //console.log(posicion)
        resultado[posicion].interpretar(entornoGlobal);
    } else {
        console.log("Error Semantico: No se encontro la instruccion EXECUTE");
        agregarSalida("Error Semantico: No se encontro la instruccion EXECUTE");
    }



    // if (!encontrado) {
    //     console.log("Error Semantico: No se encontro la instruccion EXECUTE");
    //     agregarSalida("Error Semantico: No se encontro la instruccion EXECUTE");
    // } else {
    //     resultado.interpretar(entornoGlobal);
    // }


    //console.log(entornoGlobal.tablaSim);
    //console.log(entornoGlobal.tablaFunc);
    //console.log(obtenerSalidas());


    
    res.status(200).json({resultado: obtenerSalidas()});
    console.error('\x1b[31m%s\x1b[0m', ' --------------------------- Ejecucion terminada ----------------------------------\n\n');


    

    //console.log(resultado);

   
});




// Enviando en que puerto salen los datas
app.listen(app.get('port'), () => {
    console.clear();
    console.log('Servidor iniciado en el puerto:  8000 ');
});

