import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import * as centerActions from '../actions/centerActions';

class AddCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      capacity: { value: '', isValid: true, message: '' },
      address: { value: '', isValid: true, message: '' },
      state: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' }
    };
  }
  onChange(event) {
    const { state } = this;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  clearFields() {
    this.setState({ name: { value: '', isValid: true, message: '' } });
    this.setState({ capacity: { value: '', isValid: true, message: '' } });
    this.setState({ address: { value: '', isValid: true, message: '' } });
    this.setState({ state: { value: '', isValid: true, message: '' } });
    this.setState({ detail: { value: '', isValid: true, message: '' } });
  }
  
}
