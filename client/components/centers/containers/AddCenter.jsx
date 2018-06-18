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
import * as styles from '../../../css/index.module.css';

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
    this.image = '';
  }
  getSignedRequest(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            this.uploadFile(file, response.signedRequest, response.url).then((res) => {
              resolve(res);
            })
              .catch((err) => {
                reject(Error(err));
              });
          } else {
            console.log('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    });
  }
  uploadFile(file, signedRequest, url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(url);
            this.url = url;
          } else {
            reject(Error('Could not upload file.'));
          }
        }
      };
      xhr.send(file);
    });
  }
  handleChange(event) {
    const { state } = this;
    const { name, value } = event.target;
    const field = state[name];
    switch (name) {
      case 'imageUpload':
        // this.getSignedRequest(event.target.files[0]);
        this.image = event.target.files[0];
        this.setState({
          image: Object.assign({}, this.state.image, { value: event.target.files[0].name })
        });
        // console.log(event.target.files[0].name);
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
    this.props.centerActions.centersLoading();
    this.getSignedRequest(this.image).then((res) => {
      const center = {
        name: this.state.name.value,
        capacity: this.state.capacity.value,
        address: this.state.address.value,
        state: this.state.state.value,
        chairs: this.state.chairs.value,
        projector: this.state.projector.value,
        detail: this.state.detail.value,
        image: res
      };
      if (this.formIsValid()) {
        this.props.centerActions.addCenter(center)
          .then((response) => {
            Materialize.toast(response, 10000, 'green');
            this.props.hideModal();
          })
          .catch(error => Materialize.toast(error, 10000, 'red'));
      }
    });
  }
  render() {
    const nameClasses = classNames('help-block', { [styles['has-error']]: !this.state.name.isValid });
    const detailClasses = classNames('help-block', { [styles['has-error']]: !this.state.detail.isValid });
    const addressClasses = classNames('help-block', { [styles['has-error']]: !this.state.address.isValid });
    const stateClasses = classNames('help-block', { [styles['has-error']]: !this.state.state.isValid });
    const capacityClasses = classNames('help-block', { [styles['has-error']]: !this.state.capacity.isValid });
    const containerClasses = classNames('container', styles['max-width-six-hundred']);
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    }
    return (
      <div className={containerClasses}>
        <div className="container">
          <h3 className={styles['center-heading']}>Add a Center</h3>
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
    );
  }
}
AddCenter.propTypes = {
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.bool,
  hideModal: PropTypes.func
};
AddCenter.defaultProps = {
  hideModal: () => {},
  isLoading: false
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
