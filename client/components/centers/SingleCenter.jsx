import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventsList from '../events/EventsList';
import CenterDetail from './CenterDetail';
import * as centerActions from '../../actions/centerActions';

class SingleCenter extends Component {
  componentWillMount() {
    this.props.centerActions.getCenter();
  }
  render() {
    return (
      <div className=".container">
        <div className="valign-wrapper center-align show-center-top">
          <CenterDetail center={this.props.center} />
        </div>
        <div className="row">
          <div className="col s12 m8 l8 left-div-padding">
            <EventsList events={this.props.center.events} />
          </div>
        </div>
      </div>
    );
  }
}
SingleCenter.propTypes = {
  center: PropTypes.objectOf().isRequired,
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired
};
// function mapStateToProps(state, ownProps) {
//   let center = {
//     name: '',
//     capacity: '',
//     detail: '',
//     address: '',
//     state: '',
//     chairs: '',
//     projector: '',
//     image: '',
//     events: {}
//   };
//   const centerId = ownProps.params.id;
//   if (state.centers.length > 0) {
//     center = Object.assign({}, state.centers.find(center => center.id === centerId));
//   }
//   return { center };
// }
function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
export default connect(mapDispatchToProps)(SingleCenter);
