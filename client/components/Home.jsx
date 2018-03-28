import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import events from '../img/events.jpeg';
import rentals from '../img/rentals.jpg';
import * as eventActions from '../actions/eventActions';
import * as centerActions from '../actions/centerActions';
import EventsListWithImage from './events/presentational/EventsListWithImage';
import CenterList from './centers/presentational/CenterList';

export class Home extends React.Component {
  componentDidMount() {
    $('.parallax').parallax();
    if (this.props.centers.length === 0) {
      this.props.actions.fetchCenters();
    }
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents();
    }
  }
  render() {
    const { centers = [] } = this.props;
    const { events = [] } = this.props;
    return (
      <div className="home-container">
        <div className="parallax-container">
          <div className="parallax">
            <img src={rentals} className="responsive-img" alt="" />
          </div>
        </div>
        <div className="home-button-group">
          <Link
            to="/signup"
            className="waves-effect waves-light btn home-button-left"
          >Signup
          </Link>
          <Link
            to="/login"
            className="waves-effect waves-light btn home-button-right"
          >Login
          </Link>
        </div>
        <div className="horizontal-rule">
          <hr />
        </div>
        <div className="container">
          <div>
            <h2 id="home-center-horizontally">Featured events</h2>
            <div className="row">
              <EventsListWithImage
                events={events}
                isAdmin={false}
              />
            </div>
          </div>
          <div>
            <h2 id="home-center-horizontally">Featured centers</h2>
            <div className="row">
              <CenterList
                centers={centers}
                isAdmin={false}
              />
            </div>
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
    events: events.slice(0, 3)
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, eventActions, centerActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
