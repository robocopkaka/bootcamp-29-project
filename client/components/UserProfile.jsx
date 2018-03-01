import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import EventsListWithImage from './events/EventsListWithImage';

class UserProfile extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    const { events = [] } = this.props;
    return (
      <React.Fragment>
        <ul className="tabs navbar-purple blue-text">
          <li className="tab col s3"><a className="active" href="#all-events">All Events</a></li>
        </ul>
        <div id="all-events" className="col s12 left-ten-padding">
          <div className="container">
            <Search />
            <div className="row">
              <EventsListWithImage
                events={events.filter(event => event.userId === this.props.userId)}
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
      </React.Fragment>
    );
  }
}
UserProfile.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired
};
function mapStateToProps(state) {
  let events = [];
  if (state.events && state.events.length > 0) {
    events = state.events;
  }
  return {
    events,
    userId: state.session.userId
  };
}
export default connect(mapStateToProps)(UserProfile);
