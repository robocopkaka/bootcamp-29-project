import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as eventActions from '../../../actions/eventActions';
import EventDetails from '../presentational/EventDetails';

export class SingleEvent extends Component {
  componentDidMount() {
    this.props.actions.fetchSingleEvent(parseInt(this.props.match.params.id, 10));
  }
  render() {
    const { event = [] } = this.props;
    const { Center = {} } = this.props.event;
    return (
      <div className="show-center-top">
        <div className="row valign-wrapper">
          <EventDetails event={event} center={Center} />
        </div>
      </div>
    );
  }
}
SingleEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    guests: PropTypes.number,
    detail: PropTypes.string,
    status: PropTypes.string,
    centerId: PropTypes.number,
    categoryId: PropTypes.number,
    userId: PropTypes.number,
    Center: PropTypes.object
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
function mapStateToProps(state) {
  let event = {
    id: '',
    name: '',
    guests: '',
    detail: '',
    status: '',
    centerId: '',
    categoryId: '',
    userId: '',
    Center: {}
  };
  if (state.events && state.events.event.id !== '') {
    ({ events: { event } } = state);
  }
  return {
    event
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent);
