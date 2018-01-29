import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';

// ReactDOM.render(<Signup />, document.getElementById('root'));
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Login />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('signup'));
