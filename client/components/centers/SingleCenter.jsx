import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventsList from '../events/EventsList';
import CenterDetail from './CenterDetail';

class SingleCenter extends Component {
  render() {
    return (
      <div className=".container">
        <div class="valign-wrapper center-align show-center-top">
          <CenterDetail center={this.props.center} />
        </div>
        <div className="row">
          <div className="col s12 m8 l8 left-div-padding">
            <EventsList events={this.props.center.events} />
          </div>
        </div>
      </div>
    );
  };
}
SingleCenter.propTypes = {
  center: PropTypes.objectOf(),
};
function mapStateToProps(state, ownProps) {
  let center = {
    name: '',
    capacity: '',
    detail: '',
    address: '',
    state: '',
    chairs: '',
    projector: '',
    image: '',
    events: {}
  };
  const centerId = ownProps.params.id;
  if (state.centers.length > 0) {
    center = Object.assign({}, state.centers.find(center => center.id === centerId));
  }
  return { center };
}
export default connect(mapStateToProps)(SingleCenter);
