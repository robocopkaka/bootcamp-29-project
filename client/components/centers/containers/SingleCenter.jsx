import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import EventsListWithImage from '../../events/presentational/EventsListWithImage';
import CenterDetail from '../presentational/CenterDetail';
import AddEvent from '../../events/container/AddEvent';
import * as singleCenterActions from '../../../actions/singleCenterActions';
import * as styles from '../../../css/centers.module.css';

export class SingleCenter extends Component {
  // componentWillMount() {
  //   if (this.props.center.id !== '') {
  //     console.log(this.groupByDate());
  //   }
  // }
  componentDidMount() {
    $('.modal').modal();
    this.props.singleCenterActions.fetchSingleCenter(parseInt(this.props.match.params.id, 10));
  }
  render() {
    const { center = {} } = this.props;
    const { events = [] } = this.props.center;
    const modalClasses = classNames('modal', styles['add-event-modal']);
    return (
      <div className="min-height-hundred-vh">
        <div className="valign-wrapper show-center-top">
          <CenterDetail center={this.props.center} />
        </div>
        <div className={styles['center-events']}>
          <h2>Events In This Center</h2>
        </div>
        <div className="row">
          <div className="col s12 m8 l8 left-div-padding">
            <EventsListWithImage
              events={events}
              isAdmin={false}
            />
          </div>
        </div>
        <div className="fixed-action-btn horizontal click-to-toggle">
          <a
            href="#addEventModal"
            className="btn-floating btn-large red white-color modal-trigger"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div className={modalClasses} id="addEventModal">
          <div className="modal-content">
            <AddEvent centerId={center.id} />
          </div>
        </div>
      </div>
    );
  }
}
SingleCenter.propTypes = {
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
  singleCenterActions: PropTypes.objectOf(PropTypes.func).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
};
function mapStateToProps(state) {
  // const centerId = ownProps.params.id;
  let center;
  let events;
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
  if (state.center && state.center.events) {
    events = state.center.events;
  } else {
    events = [];
  }
  return {
    center,
    events
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
