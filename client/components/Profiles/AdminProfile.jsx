import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Pagination } from 'react-materialize';
import * as utilityActions from '../../actions/utilityActions';
import * as eventActions from '../../actions/eventActions';
import * as centerActions from '../../actions/centerActions';
import * as singleCenterActions from '../../actions/singleCenterActions';
import EventsListWithImage from '../events/presentational/EventsListWithImage';
import CenterList from '../centers/presentational/CenterList';
import EditEvent from '../events/container/EditEvent';
import EditCenter from '../centers/containers/EditCenter';
import Preloader from '../common/Preloader';
import Modal from '../common/Modal';
import * as styles from '../../css/index.module.css';

export class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editMode: false,
      eventPage: 1,
      centerPage: 1,
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.changePageEvent = this.changePageEvent.bind(this);
    this.changePageCenter = this.changePageCenter.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
    this.changeCenter = this.changeCenter.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.actions.setComponentName('AdminProfile');
    this.props.actions.fetchEvents(1);
    this.props.actions.fetchCenters(1);
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
  changePageEvent(e) {
    this.setState({
      eventPage: e
    });
    this.props.actions.fetchEvents(e);
  }
  changePageCenter(e) {
    this.setState({
      centerPage: e
    });
    this.props.actions.fetchCenters(e);
  }
  changeEvent(eventId) {
    const self = this;
    self.props.actions.fetchSingleEvent(parseInt(eventId, 10));
    self.setState({
      eventId
    });
  }
  changeCenter(centerId) {
    this.props.actions.fetchSingleCenter(parseInt(centerId, 10));
    this.setState({
      centerId
    });
  }
  deleteEvent(id) {
    this.props.actions.deleteEvent(id).then(() => {
      Materialize.toast('Event successfully deleted', 10000, 'green');
    });
  }
  render() {
    const { centers = [] } = this.props;
    const { events = [] } = this.props;
    const { isAdmin = false } = this.props;
    let { eventPages = 1 } = this.props;
    if ((eventPages) >= 9) {
      eventPages = 9;
    }
    let { centerPages = 1 } = this.props;
    if ((centerPages) >= 9) {
      centerPages = 9;
    }
    const leftTenPadding = classNames('col', 's12', styles['left-ten-padding']);
    const navbarPurpleClasses = classNames('tabs', 'blue-text', styles['navbar-purple']);
    const whiteColorClasses = classNames('btn-floating', 'btn-large', 'red', styles['white-color']);
    return (
      <React.Fragment>
        <ul className={navbarPurpleClasses}>
          <li className="tab col s3"><a className="active" href="#all-events">All Events</a></li>
          <li className="tab col s3"><a id="centers-link" href="#all-centers">All Centers</a></li>
        </ul>
        <div id="all-events" className={leftTenPadding}>
          <div className="container">
            <div className="row">
              { this.props.eventsLoading ? (
                <Preloader />
              ) : (
                <React.Fragment>
                  <EventsListWithImage
                    events={events}
                    loggedIn={this.props.loggedIn}
                    isAdmin={isAdmin}
                    changeEvent={this.changeEvent}
                    toggleEdit={this.toggleEdit}
                    showModal={this.showModal}
                    deleteEvent={this.deleteEvent}
                  />
                  <div>
                    { eventPages !== 1 ? (
                      <Pagination
                        items={9}
                        activePage={this.state.eventPage}
                        onSelect={this.changePageEvent}
                        maxButtons={parseInt(eventPages, 10)}
                      />
                      ) : ''}
                  </div>
                </React.Fragment>
            )}
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
        <div id="all-centers" className="col s12">
          <div className="container">
            <div className="row">
              { !this.props.centersLoading ? (
                <React.Fragment>
                  <CenterList
                    centers={centers}
                    isAdmin={isAdmin}
                    toggleEdit={this.toggleEdit}
                    changeCenter={this.changeCenter}
                    showModal={this.showModal}
                  />
                  <div>
                    { centerPages !== 1 ? (
                      <Pagination
                        items={9}
                        activePage={this.state.centerPage}
                        onSelect={this.changePageCenter}
                        maxButtons={parseInt(centerPages, 10)}
                      />
                      ) : ''}
                  </div>
                </React.Fragment>
              ) : (
                <Preloader />
              )}
            </div>
          </div>
          <Modal show={this.state.show} hideModal={this.hideModal}>
            <EditCenter
              hideModal={this.hideModal}
              centerId={this.state.centerId}
            />
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
AdminProfile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  eventsLoading: PropTypes.bool.isRequired,
  centersLoading: PropTypes.bool.isRequired,
  centerPages: PropTypes.number,
  eventPages: PropTypes.number
};
AdminProfile.defaultProps = {
  actions: {},
  centerPages: 1,
  eventPages: 1
};
function mapStateToProps(state) {
  let centers = [];
  let events = [];
  if (state.centers.centers && state.centers.centers.length > 0) {
    ({ centers: { centers } } = state);
  }
  if (state.events.events && state.events.events.length > 0) {
    ({ events: { events } } = state);
  }
  return {
    centers,
    events,
    isAdmin: state.session.isAdmin,
    eventsLoading: state.events.isLoading,
    centersLoading: state.centers.isLoading,
    eventPages: state.events.meta.pagination.pages,
    centerPages: state.centers.meta.pagination.pages,
    loggedIn: state.session.jwt,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, utilityActions, eventActions, centerActions, singleCenterActions),
      dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
