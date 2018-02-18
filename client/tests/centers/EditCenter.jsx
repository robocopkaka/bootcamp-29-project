import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import * as singleCenterActions from '../../actions/singleCenterActions';

class EditCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: this.props.center.name, isValid: true, message: '' },
      capacity: { value: this.props.center.capacity, isValid: true, message: '' },
      address: { value: this.props.center.address, isValid: true, message: '' },
      state: { value: this.props.center.state, isValid: true, message: '' },
      detail: { value: this.props.center.detail, isValid: true, message: '' },
      chairs: { value: this.props.center.chairs, isValid: true, message: '' },
      projector: { value: this.props.center.projector, isValid: true, message: '' },
      image: { value: this.props.center.image, isValid: true, message: '' }
    };
  }
  render() {
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
                  type="text"
                  className="validate"
                  value={this.state.name.value}
                  onChange={this.handleChange}
                />
                <label htmlFor="center-name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-address"
                  type="text"
                  className="validate"
                  value={this.state.address.value}
                  onChange={this.handleChange}
                />
                <label htmlFor="center-address">Address</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="center-state"
                  type="text"
                  className="validate"
                  value={this.state.state.value}
                  onChange={this.handleChange}
                />
                <label htmlFor="center-state">State</label>
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
              <label for="center-capacity">Capacity</label>
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
                <label for="center-state">Chairs</label>
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
                <label for="center-projector">Projector</label>
              </div>
            </div>
            <div clasNames="row">
              <div className="file-field input-field">
                <div className="btn navbar-purple round-btn">
                  <span>Image</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" value="owen shaw.jpg" />
                </div>
              </div>
            </div>
            <div className="row center-align">
              <button
                className="btn waves-effect waves-light navbar-purple round-btn"
                type="submit"
                name="action"
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
    events: PropTypes.array
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
    center = { state };
  }
  return {
    center
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(singleCenterActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCenter);
