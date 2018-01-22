import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }
  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handlePasswordConfirmationChange(e) {
    this.setState({ passwordConfirmation: e.target.value });
  }
  register(event) {
    alert(`Your email is ${this.state.email}`);
    event.preventDefault();
  }
  render() {
    return (
      <div className="container">
        <div className="row signup-form">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><h3 className="center-heading">Sign Up</h3></span>
                <form className="container">
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="first_name"
                        value={this.state.firstName}
                        type="text"
                        className="validate"
                        onChange={this.handleFirstNameChange}
                      />
                      <label for="first_name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="last_name"
                        value={this.state.lastName}
                        type="text"
                        className="validate"
                        onChange={this.handleLastNameChange}
                      />
                      <label for="last_name">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="email"
                        value={this.state.email}
                        type="email"
                        className="validate"
                        onChange={this.handleEmailChange}
                      />
                      <label for="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="password"
                        value={this.state.password}
                        type="password"
                        className="validate"
                        onChange={this.handlePasswordChange}
                      />
                      <label for="password">Password</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="password_confirmation"
                        value={this.state.passwordConfirmation}
                        type="password"
                        className="validate"
                        onChange={this.handlePasswordConfirmationChange}
                      />
                      <label for="password_confirmation">Password Confirmation</label>
                    </div>
                  </div>
                  <div className="row center-align">
                    <button
                      className="btn waves-effect waves-light navbar-purple round-btn"
                      onClick={this.register}
                      type="submit"
                      name="action"
                    >
                      Signup
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Signup;
