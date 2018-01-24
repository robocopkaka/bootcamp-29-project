import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      firstName: { value: '', isValid: true, message: '' },
      lastName: { value: '', isValid: true, message: '' },
      email: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: true, message: '' },
      passwordConfirmation: {
        value: '', isValid: true, matches: false, message: ''
      }
    };
    const passwordsMatch = this.state.password === this.state.passwordConfirmation;
  }
  handleFirstNameChange(e) {
    const firstName = Object.assign({}, this.state.firstName);
    firstName.value = e.target.value;
    this.setState({ firstName });
  }
  handleLastNameChange(e) {
    const lastName = Object.assign({}, this.state.lastName);
    lastName.value = e.target.value;
    this.setState({ lastName });
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
  handlePasswordConfirmationChange(e) {
    const passwordConfirmation = Object.assign({}, this.state.passwordConfirmation);
    passwordConfirmation.value = e.target.value;
    this.setState({ passwordConfirmation });
    // if (this.state.passwordConfirmation === this.state.password) {
    //   alert('Passwords don\'t match');
    // }
  }
  clearFields() {
    this.setState({ firstName: { value: '', isValid: true, message: '' } });
    this.setState({ lastName: { value: '', isValid: true, message: '' } });
    this.setState({ email: { value: '', isValid: true, message: '' } });
    this.setState({ password: { value: '', isValid: true, message: '' } });
    this.setState({
      passwordConfirmation: {
        value: '', isValid: true, message: '', matches: false
      }
    });
  }
  // comparePasswords() {
  //
  // }
  register(event) {
    axios.post(
      'http://localhost:8000/api/v2/users',
      JSON.stringify({
        name: `${this.state.firstName.value} ${this.state.lastName.value}`,
        email: this.state.email.value,
        password: this.state.password.value
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(() => {
        alert(`Your account was created successfully, ${this.state.firstName.value}`);
        this.clearFields();
      })
      .catch((err) => {
        console.log(err);
      });
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
                        value={this.state.firstName.value}
                        type="text"
                        className="validate"
                        onChange={this.handleFirstNameChange}
                      />
                      <label for="first_name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="last_name"
                        value={this.state.lastName.value}
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
                        value={this.state.email.value}
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
                        value={this.state.password.value}
                        type="password"
                        className="validate"
                        onChange={this.handlePasswordChange}
                      />
                      <label for="password">Password</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="password_confirmation"
                        value={this.state.passwordConfirmation.value}
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
