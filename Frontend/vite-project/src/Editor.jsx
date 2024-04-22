import React, { useRef, useState } from 'react';
import axios from "axios";
import './Editor.css';

import { ReactTerminal } from "react-terminal";
import Editor from '@monaco-editor/react';

function SourceCode() {

    let [resultado, setResultado] = useState(""); // Estado para almacenar el resultado

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        //alert(editorRef.current.getValue());
        let body = { entrada: editorRef.current.getValue() };
        axios
            .post("http://localhost:8000/Analizar", body)
            .then((response) => {
                console.log(response.data);

                let resultadoTexto = 'Salidas: \n\n';
                for (let i = 0; i < response.data.resultado.length; i++) {
                    resultadoTexto += ">>  " + response.data.resultado[i] + '\n';
                }
                // Actualizar el estado con la cadena resultante
                setResultado(resultadoTexto);

            });
    }

    return (
        <div className="container">
            <div className='editorCodigo'>
                <button onClick={showValue}>......Analizar.....</button>
                <Editor
                    height="90vh"
                    defaultLanguage="cpp"
                    theme="vs-dark"
                    defaultValue="// Ingresa tu codigo aqui"
                    onMount={handleEditorDidMount}
                />
            </div>


            <div className='terminal'>
                <br />
                <textarea rows="20" cols="70" value={resultado} readOnly>
                    Aquí puedes escribir tu texto.
                </textarea>
            </div>
        </div>
    );
};


export default SourceCode