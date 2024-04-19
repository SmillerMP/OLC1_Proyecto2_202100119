const {Instruccion, tipoInstruccion} = require('../instruccion');

class Switch extends Instruccion {
    constructor(condicional, cases, defaultCase, fila, columna) {
        super(tipoInstruccion.SWITCH, fila, columna);
        this.condicional = condicional;
        this.cases = cases;
        this.defaultCase = defaultCase;
    }

    interpretar(entorno) {

        this.condicional.interpretar(entorno);
        let seguir = false;

        //console.log(this.condicional)
        for (let i = 0; i < this.cases.length; i++) {

            let resultadoCase = this.cases[i].condicion.interpretar(entorno);
            // console.log(resultadoCase.valor)
            // console.log(this.condicional.valor)
            // console.log("--------------------")

            if (this.condicional.valor == resultadoCase.valor || seguir) {
                const instruccion = this.cases[i]
                let resultado = instruccion.interpretar(entorno);

                //console.log(resultado.tipo)

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    break;
                } else if (resultado == "continue") {
                    continue;
                }  else {
                    seguir = true;
                }
            }
                
        }

        if (this.defaultCase != null && !seguir) {
            for (let i = 0; i < this.defaultCase.length; i++) {
                const instruccion = this.defaultCase[i];
                let resultado = instruccion.interpretar(entorno);

                if (resultado.tipo == tipoInstruccion.BREAK) {
                    return resultado;
                } else if (resultado == "continue") {
                    continue;
                }              
            }
        }

        return this;

    }

}

module.exports = Switch;