import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';
import Login from './common/Login';
import Signup from './common/Signup';
import AddCenter from './centers/containers/AddCenter';
import Centers from './centers/containers/Centers';
import SingleCenter from './centers/containers/SingleCenter';
import EditCenter from './centers/containers/EditCenter';
import Events from './events/container/Events';
import SingleEvent from './events/container/SingleEvent';
import AddEvent from './events/container/AddEvent';
import EditEvent from './events/container/EditEvent';
import AdminProfile from './Profiles/AdminProfile';
import UserProfile from './Profiles/UserProfile';

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
const Main = ({ showModal, toggleSignup }) => (
  <Switch>
    <Route exact path="/" render={() => <Home showModal={showModal} toggleSignup={toggleSignup} />} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/centers" component={Centers} />
    <Route exact path="/centers/:id" component={SingleCenter} />
    <AdminRoute path="/add-center" component={AddCenter} />
    <AdminRoute exact path="/centers/:id/edit" component={EditCenter} />
    <AdminRoute exact path="/admin" component={AdminProfile} />
    <Route exact path="/events" component={Events} />
    <Route exact path="/events/:id" component={SingleEvent} />
    <AuthenticatedRoute exact path="/add-event" component={AddEvent} />
    <AuthenticatedRoute exact path="/events/:id/edit" component={EditEvent} />
    <AuthenticatedRoute exact path="/user" component={UserProfile} />
  </Switch>
);
Main.propTypes = {
  showModal: PropTypes.func,
  toggleSignup: PropTypes.func
};
Main.defaultProps = {
  showModal: () => {},
  toggleSignup: () => {}
};
export default Main;
