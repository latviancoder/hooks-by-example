import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './App';

const mode = window.localStorage.getItem('mode');
if (!mode || mode === 'sync') {
  // Synchronous
  ReactDOM.render(<App/>, document.getElementById('root'));
} else {
  // Concurrent
  ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
}