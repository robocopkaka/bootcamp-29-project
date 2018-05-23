import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import qs from 'query-string';
import rentals from '../img/rentals.jpg';
import * as eventActions from '../actions/eventActions';
import * as centerActions from '../actions/centerActions';
import EventsListWithImage from './events/presentational/EventsListWithImage';
import CenterList from './centers/presentational/CenterList';
import Preloader from './common/Preloader';
import HomeButtons from './HomeButtons';
import LoginButtons from './LoginButtons';

export class Home extends React.Component {
  componentDidMount() {
    // $('.parallax').parallax();
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
    return (
      <div className="home-container min-height-fifty-vh">
        <div className="home-image">
          <div className="transparent z-depth-5">
            { /* <img src={rentals} className="responsive-img" alt="" /> */}
            <div id="home-items">
              <h3 id="home-text">Kachi&#39;s Event Manager</h3>
              <div className="home-button-group">
                { !this.props.loggedIn ? (
                  <LoginButtons showModal={this.props.showModal} />
                ) : (
                  <HomeButtons />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div>
            <h2 id="home-center-horizontally">Featured events</h2>
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
            <h2 id="home-center-horizontally">Featured centers</h2>
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
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  eventsLoading: PropTypes.bool.isRequired,
  centersLoading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  showModal: PropTypes.func
};
Home.defaultProps = {
  showModal: () => {}
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
