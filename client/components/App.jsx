import React from 'react';
import Footer from './common/Footer';
import Header from './common/Header';
import Modal from './common/Modal';
import Login from './common/Login';
import Signup from './common/Signup';
import Main from './Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      signupMode: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
  }
  showModal() {
    this.setState({ show: true });
  }
  hideModal() {
    this.setState({
      show: false,
      signupMode: false
    });
  }
  toggleSignup() {
    this.setState({ signupMode: !this.state.signupMode });
  }
  render() {
    return (
      <div>
        <Header showModal={this.showModal} toggleSignup={this.toggleSignup} />
        <Main showModal={this.showModal} toggleSignup={this.toggleSignup} />
        <Modal show={this.state.show} hideModal={this.hideModal}>
          { this.state.signupMode ? (
            <Signup hideModal={this.hideModal} />
          ) : (
            <Login hideModal={this.hideModal} />
          )}
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default App;
