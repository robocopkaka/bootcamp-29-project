import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as actions from '../../actions/sessionActions';
import * as styles from '../../css/index.module.css';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    $('.button-collapse').sideNav();
  }
  logOut(e) {
    e.preventDefault();
    this.props.actions.logOutUser();
  }
  render() {
    const leftPaddingClass = classNames('nav-wrapper', styles['left-padding']);
    if (this.props.loggedIn) {
      return (
        <React.Fragment>
          <ul id="signup-dropdown" className="dropdown-content">
            { this.props.isAdmin ? (
              <li><a id="admin-profile" href="/admin">Profile</a></li>
            ) : (
              <li><a id="user-profile" href="/user">Profile</a></li>
            )}
            <li><a href="/logout" onClick={this.logOut}>Logout</a></li>
          </ul>
          <nav className={styles['navbar-purple']}>
            <div className={leftPaddingClass}>
              <Link to="/" className="brand-logo">EventManager</Link>
              <a
                href="#"
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
                      {this.props.name}<i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>

              <ul className="side-nav" id="side-menu">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/centers">Centers</Link></li>
                <li className={styles['left-padding']}>
                  <ul className="collapsible collapsible-accordion">
                    <li>
                      <a className="collapsible-header" href="#">Profile
                        <i className="material-icons right">arrow_drop_down</i>
                      </a>
                      <div className="collapsible-body">
                        <ul>
                          { this.props.isAdmin ? (
                            <li><a id="admin-profile-side" href="/admin">{this.props.name}</a></li>
                          ) : (
                            <li><a id="user-profile-side" href="/user">{this.props.name}</a></li>
                          )}
                          <li><a href="/logout" onClick={this.logOut}>Logout</a></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <ul id="signup-dropdown" className="dropdown-content">
          <li><a id="login-button" onClick={this.props.showModal}>Login</a></li>
          <li>
            <a id="signup-button" onClick={() => { this.props.showModal(); this.props.toggleSignup(); }}>Signup</a>
          </li>
        </ul>
        <nav className={styles['navbar-purple']}>
          <div className={leftPaddingClass}>
            <Link to="/" className="brand-logo">EventManager</Link>
            <a
              href="#"
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
              <li className={styles['left-padding']}>
                <ul className="collapsible collapsible-accordion">
                  <li>
                    <a className="collapsible-header" href="#">Login
                      <i className="material-icons right">arrow_drop_down</i>
                    </a>
                    <div className="collapsible-body">
                      <ul>
                        <li><a onClick={this.props.showModal}>Login</a></li>
                        <li>
                          <a onClick={() => { this.props.showModal(); this.props.toggleSignup(); }}>Signup</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
Header.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  isAdmin: PropTypes.bool,
  loggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string
};
Header.defaultProps = {
  isAdmin: false,
  actions: {},
  name: ''
};
function mapStateToProps(state) {
  const loggedIn = state.session.jwt;
  const name = state.session.name || 'Profile';
  return {
    loggedIn,
    isAdmin: state.session.isAdmin,
    name
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
