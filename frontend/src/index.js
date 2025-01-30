import React from 'react';
//import ReactDOM from 'react-dom/client'; // React 18 requires 'react-dom/client'
import { createRoot } from 'react-dom/client';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';


// Alert options
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

// Initialize the React 18 root
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    
      <App />
    
  </Provider>
  </React.StrictMode>
);
