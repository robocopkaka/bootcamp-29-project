import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

// ReactDOM.render(<Signup />, document.getElementById('root'));
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Home />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
// ReactDOM.render(<App />, document.getElementById('signup'));
