import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './assets/general-sans.css';
import './i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
