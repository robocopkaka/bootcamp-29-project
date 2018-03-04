import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as utilityActions from '../actions/utilityActions';
import Search from './Search';
import EventsListWithImage from './events/EventsListWithImage';
import CenterList from './CenterList';

class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.actions.setComponentName('AdminProfile');
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
              <EventsListWithImage
                events={events}
                isAdmin={isAdmin}
                deleteEvent={this.deleteEvent}
              />
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
              <CenterList centers={centers} isAdmin={isAdmin} />
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
  isAdmin: PropTypes.bool.isRequired
};
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
    events,
    isAdmin: state.session.isAdmin,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(utilityActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
