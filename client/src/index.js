import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Standard from './pages/Standard';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      
    <Standard />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
