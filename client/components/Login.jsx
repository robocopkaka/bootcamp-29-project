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
  login() {
    // s
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
