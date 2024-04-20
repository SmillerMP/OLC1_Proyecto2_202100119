const {Instruccion, tipoInstruccion} = require('../instruccion');

class SentenciaIf extends Instruccion {
    constructor(sentenciaIf, sentenciaElseIf, sentenciaElse, fila, columna) {
        super(tipoInstruccion.SENTENCIAIF, fila, columna);
        this.sentenciaIf = sentenciaIf;
        this.sentenciaElseIf = sentenciaElseIf;
        this.sentenciaElse = sentenciaElse;
    }

    interpretar(entorno) {

        // console.log("sentencia if: " + (this.sentenciaIf == null));
        // console.log("sentencia else if: " + (this.sentenciaElseIf == null));
        // console.log("sentencia else: " + (this.sentenciaElse== null));
        // cuando viene if, else if y else
        if (this.sentenciaIf != null && this.sentenciaElseIf != null && this.sentenciaElse != null) {
        
            let resultadoIf = this.sentenciaIf.interpretar(entorno)
            if (resultadoIf != false) {
                return resultadoIf;
            } 


            for (let i = 0; i < this.sentenciaElseIf.length; i++) {
                let resultadoElseIf = this.sentenciaElseIf[i].interpretar(entorno)
                if (resultadoElseIf != false) {
                    return resultadoElseIf;
                } 
            }

            let resultadoElse = this.sentenciaElse.interpretar(entorno)
            if (resultadoElse != false) {
                return resultadoElse;
            } 

            return this;



        // cuando viene if y else if
        } else if (this.sentenciaIf != null && this.sentenciaElseIf != null && this.sentenciaElse == null) {
        
            let resultadoIf = this.sentenciaIf.interpretar(entorno)
            if (resultadoIf != false) {
                return resultadoIf;
            } 

            for (let i = 0; i < this.sentenciaElseIf.length; i++) {;
                let resultadoElseIf = this.sentenciaElseIf[i].interpretar(entorno)
                //console.log(resultadoElseIf)
                if (resultadoElseIf != false) {
                    return resultadoElseIf;
                } 
                
            }
            

            return this;

            
        // cuando viene if y else
        } else if (this.sentenciaIf != null && this.sentenciaElseIf == null && this.sentenciaElse != null) {

            let resultadoIf = this.sentenciaIf.interpretar(entorno)
            if (resultadoIf != false) {
                return resultadoIf;
            } 

            let resultadoElse = this.sentenciaElse.interpretar(entorno)
            if (resultadoElse != false) {
                return resultadoElse;
            } 

            return this;

        
        // cuando viene if
        } else if (this.sentenciaIf != null && this.sentenciaElseIf == null && this.sentenciaElse == null) {
            let resultadoIf = this.sentenciaIf.interpretar(entorno)
            //console.log(resultadoIf)
            if (resultadoIf != false) {
                return resultadoIf;
            } 

            return this;

        }


        return this;


    }

}

module.exports = SentenciaIf;