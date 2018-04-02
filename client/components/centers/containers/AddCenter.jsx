import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import axios from 'axios';
import * as centerActions from '../../../actions/centerActions';
import CentersForm from '../presentational/CentersForm';
import Preloader from '../../common/Preloader';
import history from '../../../history';

export class AddCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      capacity: { value: '', isValid: true, message: '' },
      address: { value: '', isValid: true, message: '' },
      state: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' },
      chairs: { value: '', isValid: true, message: '' },
      projector: { value: '', isValid: true, message: '' },
      image: { value: '', isValid: true, message: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCenter = this.addCenter.bind(this);
  }
  getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:8000/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        } else {
          console.log('Could not get signed URL.');
        }
      }
    };
    xhr.send();
    // axios.get(`http://localhost:8000/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`)
    //   .then((response) => {
    //     console.log(response);
    //     JSON.parse(response);
    //     this.uploadFile(file, response.signedRequest, response.url);
    //   })
    //   .catch(() => {
    //     console.log('Could not get signed URL.');
    //   });
  }
  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({ image: Object.assign({}, this.state.image, { value: url }) });
        } else {
          console.log('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
  handleChange(event) {
    const { state } = this;
    const { name, value } = event.target;
    const field = state[name];
    switch (name) {
      case 'imageUpload':
        this.getSignedRequest(event.target.files[0]);
        break;
      default:
        field.value = value;
        this.setState({
          [field]: [field]
        });
    }
  }
  clearFields() {
    this.setState({
      name: {
        value: '', isValid: true, message: ''
      }
    });
    this.setState({ capacity: { value: '', isValid: true, message: '' } });
    this.setState({ address: { value: '', isValid: true, message: '' } });
    this.setState({ state: { value: '', isValid: true, message: '' } });
    this.setState({ detail: { value: '', isValid: true, message: '' } });
    this.setState({ chairs: { value: '', isValid: true, message: '' } });
    this.setState({ projector: { value: '', isValid: true, message: '' } });
    this.setState({ image: { value: '', isValid: true, message: '' } });
  }
  formIsValid() {
    let fieldCheck = true;
    const state = Object.assign({}, this.state);

    if (validator.isEmpty(state.name.value)) {
      state.name.isValid = false;
      state.name.message = 'Name must not be empty';

      this.setState({ name: state.name });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.address.value)) {
      state.address.isValid = false;
      state.address.message = 'Address must not be empty';

      this.setState({ address: state.address });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.state.value)) {
      state.state.isValid = false;
      state.state.message = 'State must not be empty';

      this.setState({ state: state.state });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.detail.value)) {
      state.detail.isValid = false;
      state.detail.message = 'Detail must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.capacity.value)) {
      state.capacity.isValid = false;
      state.capacity.message = 'Capacity must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (!fieldCheck) {
      return false;
    }
    return true;
  }
  resetValidationStates() {
    const state = Object.assign({}, this.state);

    Object.keys(state).forEach((key) => {
      if ({}.hasOwnProperty.call(state[key], 'isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }
  addCenter(event) {
    event.preventDefault();
    this.resetValidationStates();
    const center = {
      name: this.state.name.value,
      capacity: this.state.capacity.value,
      address: this.state.address.value,
      state: this.state.state.value,
      chairs: this.state.chairs.value,
      projector: this.state.projector.value,
      detail: this.state.detail.value,
      image: this.state.image.value,
    };
    if (this.formIsValid()) {
      this.props.centerActions.addCenter(center)
        .then((response) => {
          Materialize.toast(response, 4000, 'green');
          history.push('/centers');
        })
        .catch(error => Materialize.toast(error, 4000, 'red'));
    }
  }
  render() {
    const nameClasses = classNames('help-block', { 'has-error': !this.state.name.isValid });
    const detailClasses = classNames('help-block', { 'has-error': !this.state.detail.isValid });
    const addressClasses = classNames('help-block', { 'has-error': !this.state.address.isValid });
    const stateClasses = classNames('help-block', { 'has-error': !this.state.state.isValid });
    const capacityClasses = classNames('help-block', { 'has-error': !this.state.capacity.isValid });
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    }
    return (
      <div className="container max-width-six-hundred">
        <div className="card">
          <div className="container">
            <h3 className="center-heading">Add a Center</h3>
          </div>
          <CentersForm
            nameClasses={nameClasses}
            detailClasses={detailClasses}
            addressClasses={addressClasses}
            stateClasses={stateClasses}
            capacityClasses={capacityClasses}
            saveOrUpdate={this.addCenter}
            handleChange={this.handleChange}
            name={this.state.name}
            chairs={this.state.chairs}
            projector={this.state.projector}
            capacity={this.state.capacity}
            detail={this.state.detail}
            address={this.state.address}
            state={this.state.state}
            image={this.state.image}
          />
        </div>
      </div>
    );
  }
}
AddCenter.propTypes = {
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  return {
    isLoading: state.centers.isLoading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCenter);
