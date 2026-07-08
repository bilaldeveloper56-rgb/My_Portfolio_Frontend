import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AdminProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AdminProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
