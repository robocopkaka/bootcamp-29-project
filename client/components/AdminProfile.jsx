import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as utilityActions from '../actions/utilityActions';
import * as eventActions from '../actions/eventActions';
import * as centerActions from '../actions/centerActions';
import Search from './Search';
import EventsListWithImage from './events/presentational/EventsListWithImage';
import CenterList from './centers/presentational/CenterList';
import Preloader from './common/Preloader';

class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.actions.setComponentName('AdminProfile');
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents();
    }
    if (this.props.centers.length === 0) {
      this.props.actions.fetchCenters();
    }
  }
  deleteEvent(id) {
    this.props.actions.deleteEvent(id);
  }
  render() {
    const { centers = [] } = this.props;
    const { events = [] } = this.props;
    const { isAdmin = false } = this.props;
    return (
      <React.Fragment>
        <ul className="tabs navbar-purple blue-text">
          <li className="tab col s3"><a className="active" href="#all-events">All Events</a></li>
          <li className="tab col s3"><a href="#all-centers">All Centers</a></li>
        </ul>
        <div id="all-events" className="col s12 left-ten-padding">
          <div className="container">
            <Search />
            <div className="row">
              { this.props.eventsLoading ? (
                <Preloader />
              ) : (
                <EventsListWithImage
                  events={events}
                  isAdmin={isAdmin}
                  deleteEvent={this.deleteEvent}
                />
            )}
            </div>
          </div>
          <div className="fixed-action-btn horizontal click-to-toggle">
            <Link
              to="/add-event"
              className="btn-floating btn-large red white-color"
            >
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
        <div id="all-centers" className="col s12">
          <div className="container">
            <Search />
            <div className="row">
              { !this.props.centersLoading ? (
                <CenterList centers={centers} isAdmin={isAdmin} />
              ) : (
                <Preloader />
              )}
            </div>
          </div>
          <div className="fixed-action-btn horizontal click-to-toggle">
            <Link
              to="/add-center"
              className="btn-floating btn-large red white-color"
            >
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
AdminProfile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  eventsLoading: PropTypes.bool.isRequired,
  centersLoading: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  let centers = [];
  let events = [];
  if (state.centers.centers && state.centers.centers.length > 0) {
    ({ centers: { centers } } = state);
  }
  if (state.events.events && state.events.events.length > 0) {
    ({ events: { events } } = state);
  }
  return {
    centers,
    events,
    isAdmin: state.session.isAdmin,
    eventsLoading: state.events.isLoading,
    centersLoading: state.centers.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, utilityActions, eventActions, centerActions),
      dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
