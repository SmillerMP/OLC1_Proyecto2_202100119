const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class Case extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(tipoInstruccion.CASE, fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(entorno) {

        

        let entornoCase = new Entorno(tipoInstruccion.CASE, entorno)
        this.condicion.interpretar(entornoCase);

        //console.log(this)
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            let resultado = instruccion.interpretar(entornoCase);

            if (resultado.tipo == tipoInstruccion.BREAK) {
                //console.log("entra a brake")
                return resultado;
            } else if (resultado == tipoInstruccion.CONTINUE) {
                return resultado;
                
            } else if (resultado == tipoInstruccion.RETURN) {
                return resultado;
            }   

        }

        //console.log("llega aqui")

        return this;

         
    }

}

module.exports = Case;