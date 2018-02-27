import React from 'react';
import { Switch, Route, Redirect, Match } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import AddCenter from './AddCenter';
import Centers from './Centers';
import SingleCenter from './centers/SingleCenter';
import EditCenter from './centers/EditCenter';
import Events from './events/Events';
import SingleEvent from './events/SingleEvent';
import AddEvent from './events/AddEvent';
import EditEvent from './events/EditEvent';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    sessionStorage.getItem('jwt') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    (sessionStorage.getItem('isAdmin')) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);
const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/centers" component={Centers} />
    <Route exact path="/centers/:id" component={SingleCenter} />
    <AdminRoute path="/add-center" component={AddCenter} />
    <AdminRoute exact path="/centers/:id/edit" component={EditCenter} />
    <Route exact path="/events" component={Events} />
    <Route exact path="/events/:id" component={SingleEvent} />
    <AuthenticatedRoute exact path="/add-event" component={AddEvent} />
    <AuthenticatedRoute exact path="/events/:id/edit" component={EditEvent} />
  </Switch>
);
export default Main;
