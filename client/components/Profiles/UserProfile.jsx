import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Search from '../common/Search';
import EventsListWithImage from '../events/presentational/EventsListWithImage';
import Preloader from '../common/Preloader';
import * as eventActions from '../../actions/eventActions';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }
  componentDidMount() {
    // $('ul.tabs').tabs();
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents(1);
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
              { !this.props.isLoading ? (
                <EventsListWithImage
                  events={events.filter(event => event.userId === parseInt(this.props.userId, 10))}
                  loggedIn={this.props.loggedIn}
                  isAdmin={this.state.isAdmin}
                />
            ) : (
              <Preloader />
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
      </React.Fragment>
    );
  }
}
UserProfile.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number,
  loggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func)
};
UserProfile.defaultProps = {
  isLoading: false,
  userId: 1,
  actions: {}
};
function mapStateToProps(state) {
  let events = [];
  let isLoading = false;
  if (state.events.events && state.events.events.length > 0) {
    ({ events: { events } } = state);
  }
  if (state.events.isLoading && state.events.isLoading === true) {
    ({ events: { isLoading } } = state);
  }
  return {
    events,
    userId: state.session.userId,
    loggedIn: state.session.jwt,
    isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
