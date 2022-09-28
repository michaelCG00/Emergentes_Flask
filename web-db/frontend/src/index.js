import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProffesorProvider } from './context/professorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProffesorProvider>
      <App />
    </ProffesorProvider>
  </React.StrictMode>
);
