import React from 'react';

const Signup = () => (
  <div className="container">
    <div className="row signup-form">
      <div className="col s12 m12">
        <div className="card">
          <div className="card-content">
            <span className="card-title"><h3 className="center-heading">Sign Up</h3></span>
            <form className="container">
              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" className="validate" />
                  <label for="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" />
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" className="validate" />
                  <label for="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input id="password" type="password" className="validate" />
                  <label for="password">Password</label>
                </div>
                <div className="input-field col s6">
                  <input id="password_confirmation" type="password" className="validate" />
                  <label for="password_confirmation">Password Confirmation</label>
                </div>
              </div>
              <div className="row center-align">
                <button className="btn waves-effect waves-light navbar-purple round-btn" type="submit" name="action">Signup
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

export default Signup;
