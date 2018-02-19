import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import * as centerActions from '../../actions/centerActions';
import * as singleCenterActions from '../../actions/singleCenterActions';

class EditCenter extends Component {
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
  handleChange(event) {
    const { state } = this;
    const { name, value } = event.target;
    const field = state[name];
    field.value = value;
    this.setState({
      [field]: [field]
    });
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
      this.props.actions.updateCenter(center);
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
          <form className="card-content">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-name"
                  name="name"
                  type="text"
                  className="validate"
                  value={this.state.name.value}
                  onChange={this.handleChange}
                />
              <label htmlFor="center-name" className="active">Name</label>
                <span className={nameClasses}>{this.state.name.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-address"
                  name="address"
                  type="text"
                  className="validate"
                  value={this.state.address.value}
                  onChange={this.handleChange}
                />
                <label htmlFor="center-address" className="active">Address</label>
                <span className={addressClasses}>{this.state.address.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-state"
                  name="state"
                  type="text"
                  className="validate"
                  value={this.state.state.value}
                  onChange={this.handleChange}
                />
                <label htmlFor="center-state" className="active">State</label>
                <span className={stateClasses}>{this.state.state.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
                <input
                  id="center-capacity"
                  name="capacity"
                  value={this.state.capacity.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
              <label for="center-capacity" className="active">Capacity</label>
                <span className={capacityClasses}>{this.state.capacity.message}</span>
              </div>
              <div className="input-field col s4">
                <input
                  id="center-chairs"
                  name="chairs"
                  value={this.state.chairs.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-state" className="active">Chairs</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="center-projector"
                  name="projector"
                  value={this.state.projector.value}
                  type="number"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label for="center-projector" className="active">Projector</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="center-detail"
                  name="detail"
                  value={this.state.detail.value}
                  className="materialize-textarea validate"
                  onChange={this.handleChange}
                ></textarea>
              <label for="center-detail" className="active">Detail</label>
                <span className={detailClasses}>{this.state.detail.message}</span>
              </div>
            </div>
            <div className="row">
              <div className="file-field input-field">
                <div className="btn navbar-purple round-btn">
                  <span>Image</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    value={this.state.image.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row center-align">
              <button
                className="btn waves-effect waves-light navbar-purple round-btn"
                type="submit"
                name="action"
                onClick={this.updateCenter}
              >Update Center
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
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
    center = state.center;
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
