#!/bin/bash

echo "hola mundo"

# Ruta al archivo que deseas monitorear
archivo_gramatica="Gramatica.jison"

# Comando a ejecutar cuando se detecte un cambio en el archivo
comando_a_ejecutar="jison $archivo_gramatica"

# Función para ejecutar el comando y limpiar la pantalla
ejecutar_comando() {
    clear   # Limpia la pantalla
    echo "Cambio detectado en $archivo_gramatica"
    eval "$comando_a_ejecutar"
    echo "Proceso Terminado... :D"
}

# Inicia el monitoreo del archivo
while true; do
    evento=$(inotifywait -e modify "$archivo_gramatica" 2>/dev/null)
    if [ $? -eq 0 ]; then
        ejecutar_comando "$archivo_gramatica" || true
    fi
done

