const { Instruccion, tipoInstruccion } = require('../instruccion');
const Entorno = require('../Entorno/entorno');
let { agregarSalida, agregarError } = require('../salidas');

class LlamarFuncion extends Instruccion {
    constructor(id, parametros, fila, columna) {
        super(tipoInstruccion.LLAMARFUNCION, fila, columna);
        this.id = id;
        this.parametros = parametros;
    }

    interpretar(entorno) {



        let funcion = entorno.getFuncion(this.id);
        //console.log(this.parametros[0])
        //this.parametros[0].interpretar(entorno)
        //console.log(this.parametros[0])

        if (funcion == null) {
            console.log("Error Semántico: La función " + this.id + " no existe.")
            agregarSalida("Error Semántico: La función " + this.id + " no existe.");
            return this;
        }


        if (funcion.tipoVar != null) {

            let entornoFuncion = new Entorno(tipoInstruccion.LLAMARFUNCION, entorno)


            // verifica si la funcion necesita parametros necesita parametros
            if (funcion.parametros != null) {

                let tamanoParametrosFunc = funcion.parametros.length

                if (tamanoParametrosFunc != this.parametros.length) {
                    console.log("Error Semántico: La función " + this.id + " requiere de " + tamanoParametrosFunc + " parametros.")
                    agregarSalida("Error Semántico: La función " + this.id + " requiere de " + tamanoParametrosFunc + " parametros.");
                    agregarError("Semántico", "La función " + this.id + " requiere de " + tamanoParametrosFunc + " parametros.", this.fila, this.columna);
                    return this;
                }


                for (let i = 0; i < tamanoParametrosFunc; i++) {
                    let resultado = funcion.parametros[i].interpretar(entornoFuncion);
                    let parametroLlamada = this.parametros[i].interpretar(entorno);



                    if (resultado.tipo != parametroLlamada.tipo) {
                        console.log(parametroLlamada)
                        console.log("Error Semántico: El parametro " + (i + 1) + " no coincide con el tipo de dato.")
                        agregarSalida("Error Semántico: El parametro " + (i + 1) + " no coincide con el tipo de dato.");
                        agregarError("Semántico", "El parametro " + (i + 1) + " no coincide con el tipo de dato.", this.fila, this.columna);
                        return this;

                    } else {
                        entornoFuncion.getSimbolo(resultado.id).valor = parametroLlamada.valor
                    }
                }

                let returnEcontrado = false;
                //console.log(funcion.parametros)

                // recorre las instrucciones de la funcion
                for (let i = 0; i < funcion.instrucciones.length; i++) {
                    const instruccion = funcion.instrucciones[i];
                    //console.log(instruccion)

                    let resultado = instruccion.interpretar(entornoFuncion);

                    if (resultado.tipo == tipoInstruccion.RETURN) {
                        returnEcontrado = true;
                        // console.log(resultado)
                        return resultado;
                    }

                }

                if (!returnEcontrado) {
                    console.log("Error Semántico: La función " + this.id + " no tiene un return.")
                    agregarSalida("Error Semántico: La función " + this.id + " no tiene un return.");
                    agregarError("Semántico", "La función " + this.id + " no tiene un return.", this.fila, this.columna);
                    return this;
                }


                // en caso de que no necesite parametros
            } else {


                if (this.parametros.length != null) {
                    console.log("Error Semántico: La función " + this.id + "no requiere parametros.");
                    agregarSalida("Error Semántico: La función " + this.id + " no requiere parametros.");
                    agregarError("Semántico", "La función " + this.id + " no requiere parametros.", this.fila, this.columna);
                    return this;
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
                    console.log("Error Semántico: La función " + this.id + " no tiene un return.")
                    agregarSalida("Error Semántico: La función " + this.id + " no tiene un return.");
                    agregarError("Semántico", "La función " + this.id + " no tiene un return.", this.fila, this.columna);
                    return this;
                }



            }


        } else {
            let entornoFuncion = new Entorno(tipoInstruccion.LLAMARFUNCION, entorno)


            // verifica si la funcion necesita parametros necesita parametros
            if (funcion.parametros != null) {

                let tamanoParametrosFunc = funcion.parametros.length

                if (tamanoParametrosFunc != this.parametros.length) {
                    console.log("Error Semántico: La función " + this.id + " requiere de " + tamanoParametrosFunc + " parametros.")
                    agregarSalida("Error Semántico: La función " + this.id + " requiere de " + tamanoParametrosFunc + " parametros.");
                    agregarError("Semántico", "La función " + this.id + " requiere de " + tamanoParametrosFunc + " parametros.", this.fila, this.columna);
                    return this;
                }


                for (let i = 0; i < tamanoParametrosFunc; i++) {
                    let resultado = funcion.parametros[i].interpretar(entornoFuncion);
                    let parametroLlamada = this.parametros[i].interpretar(entorno);



                    if (resultado.tipo != parametroLlamada.tipo) {
                        console.log("Error Semántico: El parametro " + (i + 1) + " no coincide con el tipo de dato.")
                        agregarSalida("Error Semántico: El parametro " + (i + 1) + " no coincide con el tipo de dato.");
                        agregarError("Semántico", "El parametro " + (i + 1) + " no coincide con el tipo de dato.", this.fila, this.columna);
                        return this;

                    } else {
                        entornoFuncion.getSimbolo(resultado.id).valor = parametroLlamada.valor
                    }
                }


                for (let i = 0; i < funcion.instrucciones.length; i++) {
                    const instruccion = funcion.instrucciones[i];
                    //console.log(instruccion)

                    let resultado = instruccion.interpretar(entornoFuncion);

                    if (resultado.tipo == tipoInstruccion.RETURN) {

                        if (resultado.valor != null) {
                            console.log("Error Semantico: La función " + this.id + " es del tipo void.")
                            agregarSalida("Error Semantico: La función " + this.id + " es del tipo void.")
                            agregarError("Semántico", "La función " + this.id + " es del tipo void.", this.fila, this.columna);
                        }
                        return this;
                    }

                }



                // en caso de que no necesite parametros
            } else {


                let returnEcontrado = false;

                for (let i = 0; i < entorno.getFuncion(this.id).instrucciones.length; i++) {
                    const instruccion = entorno.getFuncion(this.id).instrucciones[i];
                    let resultado = instruccion.interpretar(entornoFuncion);

                    // console.log("-------------------------------------")
                    //console.log(resultado)

                    if (resultado.tipo == tipoInstruccion.RETURN) {
                        if (resultado.valor != null) {
                            console.log("Error Semantico: La función " + this.id + " es del tipo void.")
                            agregarSalida("Error Semantico: La función " + this.id + " es del tipo void.")
                            agregarError("Semántico", "La función " + this.id + " es del tipo void.", this.fila, this.columna);
                        }
                        return this;
                    }

                }

            }

        }

        //console.log(entorno.tablaFunc)

        return this;


    }

}

module.exports = LlamarFuncion;