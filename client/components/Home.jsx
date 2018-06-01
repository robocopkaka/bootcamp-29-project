import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import qs from 'query-string';
import classNames from 'classnames';
import rentals from '../img/rentals.jpg';
import * as eventActions from '../actions/eventActions';
import * as centerActions from '../actions/centerActions';
import EventsListWithImage from './events/presentational/EventsListWithImage';
import CenterList from './centers/presentational/CenterList';
import Preloader from './common/Preloader';
import HomeButtons from './HomeButtons';
import LoginButtons from './LoginButtons';
import * as styles from '../css/index.module.css';

export class Home extends React.Component {
  componentDidMount() {
    // $('.parallax').parallax();
    $('.button-collapse').sideNav();
    if (this.props.centers.length === 0) {
      this.props.actions.fetchCenters(1);
    }
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents(1);
    }
  }
  render() {
    const { centers = [] } = this.props;
    const { events = [] } = this.props;
    const containerClasses = classNames(styles['home-container'], styles['min-height-fifty-vh']);
    return (
      <div className={containerClasses}>
        <div className={styles['home-image']}>
          <div className="transparent z-depth-5">
            { /* <img src={rentals} className="responsive-img" alt="" /> */}
            <div id={styles['home-items']}>
              <h3 id="home-text">Kachi&#39;s Event Manager</h3>
              <div className={styles['home-button-group']}>
                { !this.props.loggedIn ? (
                  <LoginButtons
                    showModal={this.props.showModal}
                    toggleSignup={this.props.toggleSignup}
                  />
                ) : (
                  <HomeButtons />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div>
            <h2 id={styles['home-center-horizontally']}>Featured events</h2>
            { !this.props.eventsLoading ? (
              <div className="row">
                <EventsListWithImage
                  events={events}
                  isAdmin={false}
                />
              </div>
            ) : (
              <Preloader />
            )}
          </div>
          <div>
            <h2 id={styles['home-center-horizontally']}>Featured centers</h2>
            { !this.props.centersLoading ? (
              <div className="row">
                <CenterList
                  centers={centers}
                  isAdmin={false}
                />
              </div>
            ) : (
              <Preloader />
            )}
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  eventsLoading: PropTypes.bool,
  centersLoading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  showModal: PropTypes.func,
  toggleSignup: PropTypes.func
};
Home.defaultProps = {
  showModal: () => {},
  toggleSignup: () => {},
  centersLoading: false,
  eventsLoading: false,
  loggedIn: false,
  actions: {}
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
    centers: centers.slice(0, 3),
    events: events.slice(0, 3),
    centersLoading: state.centers.isLoading,
    eventsLoading: state.events.isLoading,
    loggedIn: state.session.jwt
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, eventActions, centerActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
