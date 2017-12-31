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
                  <input id="last_name" type="text" class="validate" />
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate" />
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input id="password" type="password" class="validate" />
                  <label for="password">Password</label>
                </div>
                <div class="input-field col s6">
                  <input id="password_confirmation" type="password" class="validate" />
                  <label for="password_confirmation">Password Confirmation</label>
                </div>
              </div>
              <div class="row center-align">
                <button class="btn waves-effect waves-light navbar-purple round-btn" type="submit" name="action">Signup
                  <i class="material-icons right">send</i>
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
