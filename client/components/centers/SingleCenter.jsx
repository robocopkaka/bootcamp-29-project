import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventsList from '../events/EventsList';
import CenterDetail from './CenterDetail';
import * as centerActions from '../../actions/centerActions';

class SingleCenter extends Component {
  componentWillMount() {
    this.props.centerActions.fetchSingleCenter(this.props.centerId);
  }
  render() {
    return (
      <div className=".container">
        <div className="valign-wrapper center-align show-center-top">
          <CenterDetail center={this.props.center} />
        </div>
        <div className="row">
          <div className="col s12 m8 l8 left-div-padding">
            <EventsList events={this.props.center.events.groupBy('date')} />
          </div>
        </div>
      </div>
    );
  }
}
SingleCenter.propTypes = {
  center: PropTypes.objectOf().isRequired,
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired,
  centerId: PropTypes.number.isRequired
};
function mapStateToProps(state, ownProps) {
  const centerId = ownProps.params.id;
  return {
    centerId,
    center: state.center
  };
}
function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCenter);
