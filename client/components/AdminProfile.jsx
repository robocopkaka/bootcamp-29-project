import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/utilityActions';

class AdminProfile extends Component {
  componentDidMount() {
    this.props.actions.setConponentName();
  }
}
AdminProfile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
function mapStateToProps(state) {
  let centers = [];
  let events = [];
  if (state.centers && state.centers.length > 0) {
    centers = state.centers;
  }
  if (state.events && state.events.length > 0) {
    events = state.events;
  }
  return {
    centers,
    events
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
