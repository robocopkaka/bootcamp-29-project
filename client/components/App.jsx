import React from 'react';
import { Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';


const App = () => (
  <div>
    <Header />
    <Home />
    <Footer />

    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </div>

);

export default App;
