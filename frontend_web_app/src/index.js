import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import { initPreline } from './utils/preline';

function Bootstrap() {
  useEffect(() => {
    initPreline();
  }, []);
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
