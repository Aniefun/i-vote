import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import '../public/css/login.css'





const rootContainer = document.getElementById('root');

const root = ReactDOM.createRoot(rootContainer);

// Change properties of the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Set padding to 0rem for left, right, top, and bottom
rootContainer.style.paddingLeft = '0rem';
rootContainer.style.paddingRight = '0rem';
rootContainer.style.paddingTop = '0rem';
rootContainer.style.paddingBottom = '0rem';
