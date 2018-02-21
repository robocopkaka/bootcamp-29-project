import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as singleEventActions from '../../actions/singleEventActions';
import EventDetails from './EventDetails';

class SingleEvent extends Component {
  componentDidMount() {
    this.props.actions.fetchSingleEvent(parseInt(this.props.match.id, 10));
  }
  render() {
    return (
      <div className="show-center-top">
        <div className="row valign-wrapper">
          <EventDetails event={this.props.event} />
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
    centerId: PropTypes.string,
    categoryId: PropTypes.string,
    userId: PropTypes.string,
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
    actions: bindActionCreators(singleEventActions, dispatch)
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
  if (state.event && state.event.id !== '') {
    event = state.event;
  }
  return {
    event
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent);
