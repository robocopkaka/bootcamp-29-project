import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as eventActions from '../../actions/eventActions';
import EventsListWithImage from './EventsListWithImage';
import Search from '../Search';

class Events extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents();
    }
  }
  deleteEvent(e) {
    this.props.actions.deleteEvent(e);
  }
  render() {
    return (
      <div className="container">
        <Search />
        <div className="top-ten-padding"></div>
        <div className="row">
          <EventsListWithImage events={this.props.events} />
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
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

function mapStateToProps(state) {
  let events = {};
  if (state.events && state.events.length > 0) {
    events = state.events;
  }
  return {
    events
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);
