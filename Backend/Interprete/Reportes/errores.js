
class Errores {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    getTipo() {
        return this.tipo;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getFila() {
        return this.fila;
    }

    getColumna() {
        return this.columna;
    }
}


module.exports = Errores;