const fs = require('fs');
let { obtenerErrores, obtenerSimbolos} = require('../salidas');


function reporteErrores() {
    let ListaErrores = obtenerErrores();
    const carpeta = './Reports';
    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true });
    }

    const archivo = './Reports/TabalaErrores.html';
    if (fs.existsSync(archivo)) {
        fs.unlinkSync(archivo);
    }

    try {
        const stream = fs.createWriteStream(archivo, { flags: 'a' });

        stream.write(`<!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Errores</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Arial">
            <script src='main.js'></script>
        </head>
        
        <body style="background-color: rgb(44,51,51); font-family: 'Arial', sans-serif; color: rgb(71, 241, 128);">
            <center><h1>Tabla de Errores Lexicos</h1></center>
            <center>
            <style type="text/css">
                .tg  {border-collapse:collapse;border-spacing:0;}
                .tg  {background-color: #000000;}
                .tg td{border-color:rgb(0, 0, 0);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg th{border-color:rgb(0, 0, 0);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:top;font-weight:bold;font-weight:800}
                .tg .tg-0lax{text-align:center;vertical-align:top}
            </style>
            <table class="tg">
            <thead>
                <tr>
                    <b> 
                        <th class="tg-0pky">#</th>
                        <th class="tg-0pky">Tipo de Error</th>
                        <th class="tg-0pky">Descripcion<br></th>
                        <th class="tg-0pky">Linea</th>
                        <th class="tg-0pky">Columna<br></th>
                    </b>
                </tr>
            </thead>
            <tbody>`);

            ListaErrores.forEach((errorLec, index) => {
            stream.write(`<tr>
                <th class="tg-0lax">${index + 1}</th>
                <th class="tg-0lax">${errorLec.getTipo()}</th>
                <th class="tg-0lax">${errorLec.getDescripcion()}</th>
                <th class="tg-0lax">${errorLec.getFila()}</th>
                <th class="tg-0lax">${errorLec.getColumna()}</th>
            </tr>`);
        });

        stream.write(`</tbody>
            </table>
            </center>
            <br><br><br>
            </body>
            </html>`);

        stream.end();
        // console.log("El Reporte se creo Satisfactoriamente");
    } catch (error) {
        console.error(error);
    }
}






function reporteSimbolos() {
    let ListaSimbolos = obtenerSimbolos();
    const carpeta = './Reports';
    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true });
    }

    const archivo = './Reports/TablaSimbolos.html';
    if (fs.existsSync(archivo)) {
        fs.unlinkSync(archivo);
    }

    try {
        const stream = fs.createWriteStream(archivo, { flags: 'a' });

        stream.write(`<!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Simbolos</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Arial">
            <script src='main.js'></script>
        </head>
        
        <body style="background-color: rgb(44,51,51); font-family: 'Arial', sans-serif; color: rgb(71, 241, 128);">
            <center><h1>Tabla de Simbolos</h1></center>
            <center>
            <style type="text/css">
                .tg  {border-collapse:collapse;border-spacing:0;}
                .tg  {background-color: #000000;}
                .tg td{border-color:rgb(0, 0, 0);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg th{border-color:rgb(0, 0, 0);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:top;font-weight:bold;font-weight:800}
                .tg .tg-0lax{text-align:center;vertical-align:top}
            </style>
            <table class="tg">
            <thead>
                <tr>
                    <b> 
                        <th class="tg-0pky">#</th>
                        <th class="tg-0pky">ID</th>
                        <th class="tg-0pky">Tipo de Simbolo<br></th>
                        <th class="tg-0pky">Tipo de Variable</th>
                        <th class="tg-0pky">Entorno<br></th>
                        <th class="tg-0pky">Linea<br></th>
                        <th class="tg-0pky">Columna<br></th>
                    </b>
                </tr>
            </thead>
            <tbody>`);

            ListaSimbolos.forEach((errorLec, index) => {
            stream.write(`<tr>
                <th class="tg-0lax">${index + 1}</th>
                <th class="tg-0lax">${errorLec.getNombre()}</th>
                <th class="tg-0lax">${errorLec.getTipoSimbolo()}</th>
                <th class="tg-0lax">${errorLec.getTipoVar()}</th>
                <th class="tg-0lax">${errorLec.getEntorno()}</th>
                <th class="tg-0lax">${errorLec.getFila()}</th>
                <th class="tg-0lax">${errorLec.getColumna()}</th>
            </tr>`);
        });

        stream.write(`</tbody>
            </table>
            </center>
            <br><br><br>
            </body>
            </html>`);

        stream.end();
        // console.log("El Reporte se creo Satisfactoriamente");
    } catch (error) {
        console.error(error);
    }
}



module.exports = { reporteErrores, reporteSimbolos} ;