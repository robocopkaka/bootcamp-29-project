import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventsList from '../events/EventsList';
import CenterDetail from './CenterDetail';
import * as singleCenterActions from '../../actions/singleCenterActions';

class SingleCenter extends Component {
  componentDidMount() {
    this.props.singleCenterActions.fetchSingleCenter(parseInt(this.props.match.params.id, 10));
  }
  // componentWillUnmount() {
  //   this.props.center = {
  //     id: '',
  //     name: '',
  //     capacity: '',
  //     state: '',
  //     address: '',
  //     chairs: '',
  //     detail: '',
  //     projector: '',
  //     image: '',
  //     events: []
  //   };
  // }
  render() {
    return (
      <div className=".container">
        <div className="valign-wrapper center-align show-center-top">
          <CenterDetail center={this.props.center} />
        </div>
        <div className="row">
          <div className="col s12 m8 l8 left-div-padding">
            { /* <EventsList events={this.props.center.events} /> */ }
          </div>
        </div>
      </div>
    );
  }
}
SingleCenter.propTypes = {
  center: PropTypes.objectOf(PropTypes.object).isRequired,
  singleCenterActions: PropTypes.objectOf(PropTypes.func).isRequired
};
function mapStateToProps(state) {
  // const centerId = ownProps.params.id;
  let center;
  if (state.center.id === '') {
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
    singleCenterActions: bindActionCreators(singleCenterActions, dispatch)
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
