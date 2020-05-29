import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as worker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('App')
);

worker.register();