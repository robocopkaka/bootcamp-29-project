import React from 'react';
import Footer from './common/Footer';
import Header from './common/Header';
import Modal from './common/Modal';
import Login from './common/Login';
import Main from './Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal() {
    this.setState({ show: true });
  }
  hideModal() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div>
        <Header showModal={this.showModal} />
        <Main showModal={this.showModal} />
        <Modal show={this.state.show} hideModal={this.hideModal}>
          <Login hideModal={this.hideModal} />
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default App;
