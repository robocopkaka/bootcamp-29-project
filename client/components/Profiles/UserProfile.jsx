import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { Pagination } from 'react-materialize';
import EventsListWithImage from '../events/presentational/EventsListWithImage';
import Preloader from '../common/Preloader';
import Modal from '../common/Modal';
import EditEvent from '../events/container/EditEvent';
import * as eventActions from '../../actions/eventActions';
import * as styles from '../../css/index.module.css';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      show: false,
      editMode: false,
      eventId: '',
      page: 1
    };
    this.changePage = this.changePage.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.actions.fetchEventsForUser(parseInt(this.props.userId, 10), 1);
  }
  showModal() {
    this.setState({
      show: true
    });
  }
  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  hideModal() {
    this.setState({
      show: false,
      editMode: false
    });
  }
  changePage(e) {
    this.setState({
      page: e
    });
    this.props.actions.fetchEventsForUser(parseInt(this.props.userId, 10), e);
  }
  changeEvent(eventId) {
    this.props.actions.fetchSingleEvent(parseInt(eventId, 10));
    this.setState({
      eventId
    });
  }
  deleteEvent(id) {
    this.props.actions.deleteEvent(parseInt(id, 10)).then(() => {
      Materialize.toast('Event successfully deleted', 10000, 'green');
    });
  }
  render() {
    const { events = [] } = this.props;
    let { pages = 1 } = this.props;
    if ((pages) >= 9) {
      pages = 9;
    }
    const leftTenPadding = classNames('col', 's12', styles['left-ten-padding']);
    const navbarPurpleClasses = classNames('tabs', 'blue-text', styles['navbar-purple']);
    const tabClasses = classNames('tab', 'col', 's3', styles['white-color']);
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    } else if (events.length === 0) {
      return (
        <div className={styles['min-height-hundred-vh']}>
          Sorry, you have not created any events yet
        </div>
      );
    }
    return (
      <React.Fragment>
        <ul className={navbarPurpleClasses}>
          <li className={tabClasses}><a className="active" href="#all-events">All Events</a></li>
        </ul>
        <div id="all-events" className={leftTenPadding}>
          <div className="container">
            <div className="row">
              <EventsListWithImage
                events={events}
                loggedIn={this.props.loggedIn}
                isAdmin={this.state.isAdmin}
                changeEvent={this.changeEvent}
                toggleEdit={this.toggleEdit}
                showModal={this.showModal}
                deleteEvent={this.deleteEvent}
              />
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
          </div>

          <Modal show={this.state.show} hideModal={this.hideModal}>
            <EditEvent
              eventId={this.state.eventId}
              hideModal={this.hideModal}
              toggleEdit={this.toggleEdit}
            />
          </Modal>
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
    pages: state.events.meta.pagination.pages
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
