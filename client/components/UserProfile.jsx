import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import EventsListWithImage from './events/EventsListWithImage';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isAdmin: false
    }
  }
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.loggedIn !== nextProps.loggedIn) {
      this.setState({ loggedIn: nextProps.loggedIn });
    }
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
                events={events.filter(event => event.userId === parseInt(this.props.userId, 10))}
                loggedIn={this.state.loggedIn}
                isAdmin={this.state.isAdmin}
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
  userId: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  let events = [];
  if (state.events && state.events.length > 0) {
    events = state.events;
  }
  return {
    events,
    userId: state.session.userId,
    loggedIn: state.session.jwt
  };
}
export default connect(mapStateToProps)(UserProfile);
