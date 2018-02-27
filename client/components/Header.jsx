import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as actions from '../actions/sessionActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut(e) {
    e.preventDefault();
    this.props.actions.logOutUser();
  }
  render() {
    const navClasses = classNames('navbar-purple', 'nav-extended');
    if (this.props.logged_in) {
      return (
        <div>
          <ul id="signup-dropdown" className="dropdown-content">
            <li><a href="/logout" onClick={this.logOut}>Logout</a></li>
            <li><Link to="/admin">Profile</Link></li>
          </ul>
          <nav className={this.props.isAdmin ? navClasses : 'navbar-purple'}>
            <div className="nav-wrapper left-padding">
              <Link to="/" className="brand-logo">EventManager</Link>
              <a
                href="index.html"
                data-activates="side-menu"
                className="button-collapse"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/centers">Centers</Link></li>
                <li>
                  <a
                    className="dropdown-button"
                    href="#!"
                    data-activates="signup-dropdown"
                  >
                      Logout<i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>

              <ul className="side-nav" id="side-menu">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/centers">Centers</Link></li>
                <li className="left-padding">
                  <ul className="collapsible collapsible-accordion">
                    <li>
                      <a className="collapsible-header" href="#">Logout
                        <i className="material-icons right">arrow_drop_down</i>
                      </a>
                      <div className="collapsible-body">
                        <ul>
                          <li><a href="/logout" onClick={this.logOut}>Logout</a></li>
                          <li><Link to="/admin">Profile</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            { this.props.isAdmin ? (
              <div className="nav-content">
                <ul className="tabs tabs-transparent">
                  <li className="tab"><a className="active" href="#all-events">All Events</a></li>
                  <li className="tab"><a href="#all-centers">All Centers</a></li>
                </ul>
              </div>
            ) : (
              <div></div>
            )}
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <ul id="signup-dropdown" className="dropdown-content">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
          <nav className="navbar-purple">
            <div className="nav-wrapper left-padding">
              <Link to="/" className="brand-logo">EventManager</Link>
              <a
                href="index.html"
                data-activates="side-menu"
                className="button-collapse"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/centers">Centers</Link></li>
                <li>
                  <a
                    className="dropdown-button"
                    href="#!"
                    data-activates="signup-dropdown"
                  >
                      Login<i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>

              <ul className="side-nav" id="side-menu">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/centers">Centers</Link></li>
                <li className="left-padding">
                  <ul className="collapsible collapsible-accordion">
                    <li>
                      <a className="collapsible-header" href="#">Login
                        <i className="material-icons right">arrow_drop_down</i>
                      </a>
                      <div className="collapsible-body">
                        <ul>
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/signup">Signup</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}
Header.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isAdmin: PropTypes.bool
};
function mapStateToProps(state) {
  return {
    logged_in: state.session.jwt,
    isAdmin: state.session.isAdmin
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
