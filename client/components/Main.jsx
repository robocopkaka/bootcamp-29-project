import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import AddCenter from './AddCenter';
import Centers from './Centers';
import SingleCenter from './centers/SingleCenter';
import EditCenter from './centers/EditCenter';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/centers" component={Centers} />
    <Route exact path="/centers/:id" component={SingleCenter} />
    <Route path="/add-center" component={AddCenter} />
    <Route exact path="/centers/:id/edit" component={EditCenter} />
  </Switch>
);
export default Main;
