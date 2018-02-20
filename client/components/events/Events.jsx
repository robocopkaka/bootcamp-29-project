import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as eventActions from '../../actions/eventActions';
import EventsListWithImage from './EventsListWithImage';
import Search from '../Search';

class Events extends Component {
  componentDidMount() {
    this.props.actions.fetchEvents();
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
          <a className="btn-floating btn-large red white-color" href="new-center.html">
            <i className="material-icons">add</i>
          </a>
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
