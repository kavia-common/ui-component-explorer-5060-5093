import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';

function Bootstrap() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <RoutesIndex />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Bootstrap />
  </React.StrictMode>
);
