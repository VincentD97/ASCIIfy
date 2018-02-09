import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App width={window.innerWidth * 0.5} height="200px"/>, document.getElementById('root'));
registerServiceWorker();
