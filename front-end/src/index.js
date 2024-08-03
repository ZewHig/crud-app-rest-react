import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa o CSS global, se houver
import App from './App';
import reportWebVitals from './reportWebVitals';

// Renderiza o componente App dentro do elemento com id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Opcional: Medição de performance
reportWebVitals();
