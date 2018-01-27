import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import validator from 'validator';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: true, message: '' }
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleEmailChange(e) {
    const email = Object.assign({}, this.state.email);
    email.value = e.target.vale;
    this.setState({ email });
  }
  handlePasswordChange(e) {
    const password = Object.assign({}, this.state.password);
    password.value = e.target.value;
    this.setState({ password });
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
    if (!validator.isEmpty(state.email.value)) {
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
    if (!validator.isEmpty(state.password.value)) {
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

    Object.keys(state).map((key) => {
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
    if (this.formIsValid()) {
      axios.post(
        'http//:localhost:8000/api/v2/users/login',
        JSON.stringify({
          email: this.state.email.value,
          password: this.state.password.value
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then((res) => {
          alert('You\'ve been logged in successfully');
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row signup-form center-align valign-wrapper">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><h3 className="center-heading">Login</h3></span>
                <form className="container">
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="email">
                        <input
                          id="email"
                          value={this.state.email.value}
                          type="email"
                          className="validate"
                          onChange={this.handleEmailChange}
                        />
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="password">
                        <input
                          id="password"
                          value={this.state.password.value}
                          type="password"
                          className="validate"
                          onChange={this.handlePasswordChange}
                        />
                        Password
                      </label>
                    </div>
                  </div>
                  <div className="row center-align">
                    <button
                      className="btn waves-effect waves-light navbar-purple round-btn"
                      type="submit"
                      name="action"
                    >Login
                      <i className="material-icons right">send</i>
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
export default Login;
