const {Instruccion, tipoInstruccion} = require('../instruccion');
const Entorno = require('../Entorno/entorno');

class LlamarFuncion extends Instruccion {
    constructor(id, parametros, fila, columna) {
        super(tipoInstruccion.LLAMARFUNCION, fila, columna);
        this.id = id;
        this.parametros = parametros;
    }

    interpretar(entorno) {

        if (entorno.getFuncion(this.id) != null) {
            if (this.parametros != null) {
                let entornoFuncion = new Entorno(tipoInstruccion.LLAMARFUNCION, entorno)
                

                // verifica si necesita parametros
                if (entorno.getFuncion(this.id).parametros != null) {
                    let tamanoParametros = entorno.getFuncion(this.id).parametros.length

                    if (tamanoParametros != this.parametros.length) {
                        console.log("Error Semántico: La función " + this.id + " requiere de " + tamanoParametros + " parametros.")
                        return this;
                    }

                    for (let i = 0; i < tamanoParametros; i++) {
                        const parametro = entorno.getFuncion(this.id).parametros[i];
                        //console.log(parametro)
                        let resultado = parametro.interpretar(entornoFuncion);

                        // console.log(resultado)
                        //console.log(this.parametros[i])
                        let parametroLlamada = this.parametros[i].interpretar(entornoFuncion);


                        if (resultado.tipo != parametroLlamada.tipo) {
                            console.log("Error Semántico: El parametro " + (i+1) + " no coincide con el tipo de dato.")
                            return this;

                        } else {
                            entornoFuncion.getSimbolo(resultado.id).valor = parametroLlamada.valor;
                            resultado.expresion = parametroLlamada.valor;

                        }


                    }

                    let returnEcontrado = false;

                    for (let i = 0; i < entorno.getFuncion(this.id).instrucciones.length; i++) {
                        const instruccion = entorno.getFuncion(this.id).instrucciones[i];
                        let resultado = instruccion.interpretar(entornoFuncion);

                        // console.log("-------------------------------------")
                        //console.log(resultado)

                        if (resultado.tipo == tipoInstruccion.RETURN) {
                            returnEcontrado = true;
                            return resultado;
                        }

                    } 

                    if (!returnEcontrado) {
                        console.log("al parecer pasa aqui")
                        console.log("Error Semántico: La función " + this.id + " no tiene un return.")
                        return this;
                    }
                }
            }

            //console.log(entorno.tablaFunc)

            return this;
        } else {
            console.log("Error Semántico: La función " + this.id + " no existe.")
            return this;
        }

    }

}

module.exports = LlamarFuncion;