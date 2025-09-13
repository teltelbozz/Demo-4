// src/renderApp.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import Demo4App from './Demo4App.jsx'
import './index.css'

export default function renderApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Demo4App />
    </React.StrictMode>,
  )
}