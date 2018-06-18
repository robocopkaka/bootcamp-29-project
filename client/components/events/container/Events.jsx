import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Pagination } from 'react-materialize';
import qs from 'query-string';
import * as eventActions from '../../../actions/eventActions';
import EventsListWithImage from '../presentational/EventsListWithImage';
import Preloader from '../../common/Preloader';
import history from '../../../history';
import * as styles from '../../../css/index.module.css';
import * as eventStyles from '../../../css/events.module.css';

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    // this.deleteEvent = this.deleteEvent.bind(this);
    this.changePage = this.changePage.bind(this);
    // this.changeEvent = this.changeEvent.bind(this);
  }
  componentDidMount() {
    const values = qs.parse(this.props.location.search);
    let page;
    if (values.page === undefined) {
      page = 1;
    } else {
      page = parseInt(values.page, 10);
    }
    this.props.actions.fetchEvents(page);
  }
  // deleteEvent(id) {
  //   this.props.actions.deleteEvent(parseInt(id, 10));
  // }
  changePage(e) {
    this.setState({
      page: e
    });
    history.push(`/events/?page=${e}`);
    this.props.actions.fetchEvents(e);
  }
  // changeEvent(eventId) {
  //   this.setState({
  //     eventId
  //   });
  // }
  render() {
    const { events = [] } = this.props;
    const notAdmin = false;
    const whiteColorClasses = classNames('btn-floating', 'btn-large', 'red', styles['white-color']);
    const containerClasses = classNames('container', styles['min-height-hundred-vh']);
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
        <div className={containerClasses}>
          <p>No events found yet</p>
        </div>
      );
    }
    return (
      <div className={containerClasses}>
        <div className={styles['top-ten-padding']} />
        <div className={eventStyles['event-heading']}>Events</div>
        <div className="row">
          <EventsListWithImage
            events={events}
            isAdmin={notAdmin}
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
        { /* <div className="fixed-action-btn horizontal click-to-toggle">
          <a
            to="/add-event"
            className={whiteColorClasses}
          >
            <i className="material-icons">add</i>
          </a>
        </div> */}
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
  const isAdmin = false;
  if (state.events.events && state.events.events.length > 0) {
    ({ events: { events } } = state);
  }
  // if (state.session.isAdmin && state.session.isAdmin === true) {
  //   ({ session: { isAdmin } } = state);
  // }
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
