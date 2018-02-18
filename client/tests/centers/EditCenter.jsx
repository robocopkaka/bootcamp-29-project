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
    this.state = {};
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
                <input id="center-name" type="text" className="validate" value="Kachi's Center" />
                <label htmlFor="center-name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="center-address" type="text" className="validate" value="Gowon Estate" />
                <label htmlFor="center-address">Address</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="center-state" type="text" className="validate" value="Lagos" />
                <label htmlFor="center-state">State</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <div className="chips chips-initial"></div>
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
