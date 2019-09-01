import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GratitudeListApp from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<GratitudeListApp />, document.getElementById('root'));

// ReactDOM.render(<GratitudeListApp />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
