import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TopBar from './TopBar.jsx'
import SourceCode from './Editor.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SourceCode/>
  </React.StrictMode>,
)
