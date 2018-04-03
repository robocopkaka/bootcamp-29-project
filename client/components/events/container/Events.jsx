import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as eventActions from '../../../actions/eventActions';
import EventsListWithImage from '../presentational/EventsListWithImage';
import Search from '../../common/Search';
import Preloader from '../../common/Preloader';

export class Events extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents();
    }
  }
  deleteEvent(id) {
    this.props.actions.deleteEvent(parseInt(id, 10));
  }
  render() {
    const { events = [] } = this.props;
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    }
    if (events.length === 0) {
      return (
        <div className="container min-height-hundred-vh">
          <p>No events found yet</p>
        </div>
      );
    }
    return (
      <div className="container">
        <Search />
        <div className="top-ten-padding" />
        <div className="row">
          <EventsListWithImage
            events={events}
            deleteEvent={this.deleteEvent}
            isAdmin={this.props.isAdmin}
          />
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

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.string
};
Events.defaultProps = {
  isLoading: false,
  message: ''
};

function mapStateToProps(state) {
  let events = [];
  let isAdmin = false;
  if (state.events.events && state.events.events.length > 0) {
    ({ events: { events } } = state);
  }
  if (state.session.isAdmin && state.session.isAdmin === true) {
    ({ session: { isAdmin } } = state);
  }
  return {
    events,
    isAdmin,
    isLoading: state.events.isLoading,
    message: state.events.message
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);
