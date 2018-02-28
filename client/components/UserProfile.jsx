import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
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
    return (
      <div id="all-events" className="col s12 left-ten-padding">
        <div className="container">
          <Search />
          <EventsListWithImage />
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
    );
  }
}
UserProfile.propTypes = {

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
}
export default connect(mapStateToProps)(UserProfile);
