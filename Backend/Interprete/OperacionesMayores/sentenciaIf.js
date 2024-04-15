const {Instruccion, tipoInstruccion} = require('../instruccion');

class If extends Instruccion {
    constructor(sentenciaIf, sentenciaElseIf, sentenciaElse,fila, columna) {
        super(tipoInstruccion.SENTENCIAIF, fila, columna);
        this.sentenciaIf = sentenciaIf;
        this.sentenciaElseIf = sentenciaElseIf;
        this.sentenciaElse = sentenciaElse;
    }

    interpretar(entorno) {

        // console.log("sentencia if: " + this.sentenciaIf);
        // console.log("sentencia else if: " + this.sentenciaElseIf);
        // console.log("sentencia else: " + this.sentenciaElse);
        // cuando viene if, else if y else
        if (this.sentenciaIf != null && this.sentenciaElseIf != null && this.sentenciaElse != null) {
        
            if (this.sentenciaIf.interpretar(entorno)) {
                return;
            } 


            for (let i = 0; i < this.sentenciaElseIf.length; i++) {
                const elseIf = this.sentenciaElseIf[i];
                if (elseIf.interpretar(entorno)) {
                    return;
                }
            }

            this.sentenciaElse.interpretar(entorno);


        // cuando viene if y else if
        } else if (this.sentenciaIf != null && this.sentenciaElseIf != null && this.sentenciaElseIf == null) {

            if (this.sentenciaIf.interpretar(entorno)) {
                return;
            } 

            for (let i = 0; i < this.sentenciaElseIf.length; i++) {
                const elseIf = this.sentenciaElseIf[i];
                if (elseIf.interpretar(entorno)) {
                    return;
                }
            }
            
            
        // cuando viene if y else
        } else if (this.sentenciaIf != null && this.sentenciaElseIf == null && this.sentenciaElse != null) {
            if (this.sentenciaIf.interpretar(entorno)) {
                return;
            } 

            this.sentenciaElse.interpretar(entorno);
        
        // cuando viene if
        } else if (this.sentenciaIf != null && this.sentenciaElseIf == null && this.sentenciaElse == null) {
            if (this.sentenciaIf.interpretar(entorno)) {
                return;
            } 
        }

    }

}

module.exports = If;