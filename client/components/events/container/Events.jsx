import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-materialize';
import qs from 'query-string';
import * as eventActions from '../../../actions/eventActions';
import EventsListWithImage from '../presentational/EventsListWithImage';
import Search from '../../common/Search';
import Preloader from '../../common/Preloader';
import history from '../../../history';
import * as styles from '../../../css/events.module.css';

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      eventId: ''
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }
  componentDidMount() {
    const values = qs.parse(this.props.location.search);
    let page;
    if (values.page === undefined) {
      page = 1;
    } else {
      page = parseInt(values.page, 10);
    }
    if (this.props.events.length === 0) {
      this.props.actions.fetchEvents(page);
    }
  }
  deleteEvent(id) {
    this.props.actions.deleteEvent(parseInt(id, 10));
  }
  changePage(e) {
    this.setState({
      page: e
    });
    history.push(`/events/?page=${e}`);
    this.props.actions.fetchEvents(e);
  }
  changeEvent(eventId) {
    this.setState({
      eventId
    });
  }
  render() {
    const { events = [] } = this.props;
    let { pages = 1 } = this.props;
    if (pages >= 9) {
      pages = 9;
    }
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    }
    if (events.length === 0) {
      return (
        <div className="container min-height-hundred-vh">
          <p>No events found yet</p>
        </div>
      );
    }
    return (
      <div className="container min-height-hundred-vh">
        <Search />
        <div className="top-ten-padding" />
        <div className="row">
          <EventsListWithImage
            events={events}
            deleteEvent={this.deleteEvent}
            isAdmin={this.props.isAdmin}
            changeEvent={this.changeEvent}
          />
        </div>
        { pages !== 1 ? (
          <Pagination
            items={9}
            activePage={this.state.page}
            onSelect={this.changePage}
            maxButtons={pages}
          />
        ) : '' }
        <div className="fixed-action-btn horizontal click-to-toggle">
          <Link
            to="/add-event"
            className="btn-floating btn-large red white-color"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  pages: PropTypes.number
};
Events.defaultProps = {
  isLoading: false,
  message: '',
  pages: 1
};

function mapStateToProps(state) {
  let events = [];
  let isAdmin = false;
  if (state.events.events && state.events.events.length > 0) {
    ({ events: { events } } = state);
  }
  if (state.session.isAdmin && state.session.isAdmin === true) {
    ({ session: { isAdmin } } = state);
  }
  return {
    events,
    isAdmin,
    isLoading: state.events.isLoading,
    message: state.events.message,
    pages: state.events.meta.pagination.pages
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);
