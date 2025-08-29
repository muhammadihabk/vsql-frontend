import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.scss';
import '../src/styles/common.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import { CanvasQueryProvider } from './context/canvas-query.context';
import { SchemaTablesProvider } from './context/schema-tables.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SchemaTablesProvider>
          <CanvasQueryProvider>
            <App />
          </CanvasQueryProvider>
        </SchemaTablesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
