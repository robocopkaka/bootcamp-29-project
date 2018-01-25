import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import validator from 'validator';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  login() {
    const self = this;
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
                        <input id="email" type="email" className="validate" />
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="password">
                        <input id="password" type="password" className="validate" />
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
