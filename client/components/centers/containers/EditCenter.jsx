import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import * as centerActions from '../../../actions/centerActions';
import * as singleCenterActions from '../../../actions/singleCenterActions';
import CentersForm from '../presentational/CentersForm';
import history from '../../../history';

export class EditCenter extends Component {
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
      image: { value: '', isValid: true, message: '' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchSingleCenter(parseInt(this.props.match.params.id, 10));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.center.id !== nextProps.center.id) {
      this.setState({
        name: Object.assign({}, this.state.name, { value: nextProps.center.name }),
        address: Object.assign({}, this.state.address, { value: nextProps.center.address }),
        state: Object.assign({}, this.state.state, { value: nextProps.center.state }),
        detail: Object.assign({}, this.state.detail, { value: nextProps.center.detail }),
        chairs: Object.assign({}, this.state.chairs, {
          value: (nextProps.center.chairs).toString()
        }),
        projector: Object.assign({}, this.state.projector, {
          value: (nextProps.center.projector).toString()
        }),
        capacity: Object.assign({}, this.state.capacity, {
          value: (nextProps.center.capacity).toString()
        }),
        image: Object.assign({}, this.state.image, { value: nextProps.center.image }),
      });
    }
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

    Object.keys(state).map((key) => {
      if ({}.hasOwnProperty.call(state[key], 'isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }
  updateCenter(event) {
    event.preventDefault();
    this.resetValidationStates();
    const center = {
      id: this.props.match.params.id,
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
      this.props.actions.updateCenter(center)
        .then((response) => {
          Materialize.toast(response.message, 4000, 'green');
          history.push(`/centers/${response.center.id}`);
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
    return (
      <div className="container max-width-six-hundred">
        <div className="card">
          <div className="container">
            <h3 className="center-heading">Edit a Center</h3>
          </div>
          <CentersForm
            nameClasses={nameClasses}
            detailClasses={detailClasses}
            addressClasses={addressClasses}
            stateClasses={stateClasses}
            capacityClasses={capacityClasses}
            saveOrUpdate={this.updateCenter}
            handleChange={this.handleChange}
            name={this.state.name}
            chairs={this.state.chairs}
            projector={this.state.projector}
            capacity={this.state.capacity}
            detail={this.state.detail}
            address={this.state.address}
            state={this.state.state}
            image={this.state.image}
            component="Edit"
          />
        </div>
      </div>
    );
  }
}
EditCenter.propTypes = {
  center: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    capacity: PropTypes.number,
    detail: PropTypes.string,
    chairs: PropTypes.number,
    projector: PropTypes.number,
    address: PropTypes.string,
    state: PropTypes.string,
    image: PropTypes.string,
    events: PropTypes.array
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
};
function mapStateToProps(state) {
  let center;
  if (state.center && state.center.id === '') {
    center = {
      id: '',
      name: '',
      capacity: '',
      state: '',
      address: '',
      chairs: '',
      detail: '',
      projector: '',
      image: '',
      events: []
    };
  } else {
    ({ center } = state);
  }
  return {
    center
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, singleCenterActions, centerActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCenter);
