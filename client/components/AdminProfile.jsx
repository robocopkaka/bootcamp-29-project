import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as utilityActions from '../actions/utilityActions';
import Search from './Search';
import EventsListWithImage from './events/EventsListWithImage';
import CenterList from './CenterList';

class AdminProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
    this.props.actions.setComponentName('AdminProfile');
  }
  render() {
    const { centers = [] } = this.props;
    const { events = [] } = this.props;
    return (
      <div>
        <div id="all-events" className="col s12 left-ten-padding">
          <Search />
          <EventsListWithImage events={events} />
        </div>
        <div id="all-centers" className="col s12">
          <Search />
          <CenterList centers={centers} />
        </div>
      </div>
    );
  }
}
AdminProfile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired
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
    events
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(utilityActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
