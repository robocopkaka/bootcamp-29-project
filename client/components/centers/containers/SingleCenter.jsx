import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Pagination } from 'react-materialize';
import EventsListWithImage from '../../events/presentational/EventsListWithImage';
import CenterDetail from '../presentational/CenterDetail';
import AddEvent from '../../events/container/AddEvent';
import EditEvent from '../../events/container/EditEvent';
import * as singleCenterActions from '../../../actions/singleCenterActions';
import * as centerActions from '../../../actions/centerActions';
import * as eventActions from '../../../actions/eventActions';
import * as styles from '../../../css/centers.module.css';

export class SingleCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      eventId: ''
    };
    this.changePage = this.changePage.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  componentDidMount() {
    $('.modal').modal();
    this.props.actions.fetchSingleCenter(parseInt(this.props.match.params.id, 10));
    this.props.actions.fetchEventsInCenter(parseInt(this.props.match.params.id, 10), 1);
  }
  changePage(e) {
    this.setState({
      page: e
    });
    this.props.actions.fetchEventsInCenter(parseInt(this.props.match.params.id, 10), e);
  }
  changeEvent(eventId) {
    this.props.actions.fetchSingleEvent(parseInt(eventId, 10));
    this.setState({
      eventId
    });
  }
  deleteEvent(id) {
    this.props.actions.deleteEventInCenter(parseInt(id, 10));
  }
  render() {
    const { center = {} } = this.props;
    const { events = [] } = this.props;
    let { pages = 1 } = this.props;
    if ((pages) >= 9) {
      pages = 9;
    }
    const modalClasses = classNames('modal', styles['add-event-modal']);
    return (
      <div className="min-height-hundred-vh">
        <div className="valign-wrapper show-center-top">
          <CenterDetail center={this.props.center} />
        </div>
        <div className={styles['center-events']}>
          <h2>Events In This Center</h2>
        </div>
        { events.length !== 0 ? (
          <React.Fragment>
            <div className="row">
              <div className={styles['events-in-center']}>
                <EventsListWithImage
                  events={events}
                  deleteEvent={this.deleteEvent}
                  isAdmin={this.props.isAdmin}
                  changeEvent={this.changeEvent}
                  centerId={center.id}
                />
              </div>
            </div>
            <div className={styles['events-in-center']}>
              { pages !== 1 ? (
                <Pagination
                  items={9}
                  activePage={this.state.page}
                  onSelect={this.changePage}
                  maxButtons={parseInt(pages, 10)}
                />
              ) : ''}
            </div>
          </React.Fragment>
        ) : (
          <div id={styles['no-events']}>
            No events have been created yet
          </div>
        )}
        <div className="fixed-action-btn horizontal click-to-toggle">
          <a
            href="#addEventModal"
            className="btn-floating btn-large red white-color modal-trigger"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div className={modalClasses} id="addEventModal">
          <div className="modal-content">
            <AddEvent centerId={center.id} />
          </div>
        </div>
      </div>
    );
  }
}
SingleCenter.propTypes = {
  center: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    capacity: PropTypes.number,
    detail: PropTypes.string,
    chairs: PropTypes.number,
    projector: PropTypes.number,
    address: PropTypes.string,
    state: PropTypes.string,
    image: PropTypes.string,
    events: PropTypes.array
  }),
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  pages: PropTypes.number,
  isAdmin: PropTypes.bool
};
SingleCenter.defaultProps = {
  events: [],
  pages: 1,
  center: {
    id: '',
    name: '',
    capacity: '',
    state: '',
    address: '',
    chairs: '',
    detail: '',
    projector: '',
    image: '',
  },
  isAdmin: false
};
function mapStateToProps(state) {
  // const centerId = ownProps.params.id;
  let center;
  let events;
  let isAdmin;
  if (state.center && state.center.center.id !== '') {
    ({ center: { center } } = state);
  }
  if (state.center && state.center.events.events) {
    ({ events: { events } } = state.center);
  }
  if (state.session.isAdmin && state.session.isAdmin === true) {
    ({ session: { isAdmin } } = state);
  }
  return {
    isAdmin,
    center,
    events,
    pages: state.center.events.meta.pagination.pages
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions:
      bindActionCreators(Object.assign({}, centerActions, eventActions, singleCenterActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCenter);
