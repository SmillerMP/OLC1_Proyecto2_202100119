import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import Editor from '@monaco-editor/react';

function SourceCode() {
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
                console.log(response.data.message);
            });
    }

    return (
        <>
            <button onClick={showValue}>Show value</button>
            <Editor
                height="90vh"
                defaultLanguage="cpp"
                theme="vs-dark"
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
            />
        </>
    );
}


export default SourceCode