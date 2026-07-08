import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';

// Configure Axios baseURL for production/local development
let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
if (apiBaseUrl.endsWith('/api')) {
  apiBaseUrl = apiBaseUrl.slice(0, -4);
}
axios.defaults.baseURL = apiBaseUrl;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
