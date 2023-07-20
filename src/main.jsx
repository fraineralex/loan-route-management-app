import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
const syncfusionKey = import.meta.env.VITE_APP_SYNCFUSION_KEY;
registerLicense(syncfusionKey);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);