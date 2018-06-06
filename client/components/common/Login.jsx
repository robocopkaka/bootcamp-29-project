import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import axios from 'axios';
import classNames from 'classnames';
import validator from 'validator';
import PropTypes from 'prop-types';
import * as sessionActions from '../../actions/sessionActions';
import Preloader from './Preloader';
import * as styles from '../../css/index.module.css';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: true, message: '' }
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }
  handleEmailChange(e) {
    const email = Object.assign({}, this.state.email);
    email.value = e.target.value;
    this.setState({ email });
  }
  handlePasswordChange(e) {
    const password = Object.assign({}, this.state.password);
    password.value = e.target.value;
    this.setState({ password });
  }
  clearFields() {
    this.setState({ email: { value: '', isValid: true, message: '' } });
    this.setState({ password: { value: '', isValid: true, message: '' } });
  }
  formIsValid() {
    let fieldCheck = true;
    const state = Object.assign({}, this.state);

    if (!validator.isEmail(state.email.value)) {
      state.email.isValid = false;
      state.email.message = 'Email is invalid';

      this.setState({ email: state.email });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.email.value)) {
      state.email.isValid = false;
      state.email.message = 'Email must not be empty';

      this.setState({ email: state.email });
      fieldCheck = false;
    }
    if (!validator.isLength(state.password.value, { min: 6 })) {
      state.password.isValid = false;
      state.password.message = 'Password must have at least 6 characters';

      this.setState({ password: state.password });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.password.value)) {
      state.password.isValid = false;
      state.password.message = 'Password must not be empty';

      this.setState({ password: state.password });
      fieldCheck = false;
    }
    if (!fieldCheck) {
      return false;
    }
    return true;
  }
  resetValidationStates() {
    const state = Object.assign({}, this.state);

    Object.keys(state).forEach((key) => {
      if ({}.hasOwnProperty.call(state[key], 'isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }
  login(event) {
    event.preventDefault();
    this.resetValidationStates();
    const credentials = {
      email: this.state.email.value,
      password: this.state.password.value
    };
    if (this.formIsValid()) {
      this.props.actions.loginUser(credentials)
        .then((response) => {
          Materialize.toast(response, 10000, 'green');
          this.clearFields();
          this.props.hideModal();
        })
        .catch(error => Materialize.toast(error, 10000, 'red'));
      // this.clearFields();
    }
  }
  render() {
    const { isLoading = false } = this.props;
    const emailClasses = classNames('help-block', { [styles['has-error']]: !this.state.email.isValid });
    const passwordClasses = classNames('help-block', { [styles['has-error']]: !this.state.password.isValid });
    const signupFormClasses = classNames('row', 'center-align', 'valign-wrapper', styles['signup-form']);
    const navbarPurpleClasses = classNames('btn', 'waves-effect', 'waves-light', styles['navbar-purple'], styles['round-btn']);
    if (isLoading) {
      return (
        <Preloader />
      );
    }
    return (
      <div className="container">
        <div className={signupFormClasses}>
          <div className="col s12 m12">
            <div>
              <div className="card-content">
                <span className="card-title"><h3 className={styles['center-heading']}>Login</h3></span>
                <form className="container">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="email"
                        value={this.state.email.value}
                        type="email"
                        className="validate"
                        onChange={this.handleEmailChange}
                      />
                      { this.state.email.value === '' ? (
                        <label htmlFor="email">Email</label>
                      ) : (
                        <label htmlFor="email" className="active">Email</label>
                      )}
                      <span className={emailClasses}>{this.state.email.message}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="password"
                        value={this.state.password.value}
                        type="password"
                        className="validate"
                        onChange={this.handlePasswordChange}
                      />
                      { this.state.password.value === '' ? (
                        <label htmlFor="password">Password</label>
                      ) : (
                        <label htmlFor="password" className="active">Password</label>
                      )}
                      <span className={passwordClasses}>{this.state.password.message}</span>
                    </div>
                  </div>
                  <div className="row center-align">
                    <button
                      className={navbarPurpleClasses}
                      type="submit"
                      name="action"
                      onClick={this.login}
                    >Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  isLoading: PropTypes.bool.isRequired,
  hideModal: PropTypes.func
};
Login.defaultProps = {
  hideModal: () => {},
  actions: {}
};
function mapStateToProps(state) {
  return {
    isLoading: state.session.isLoading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
