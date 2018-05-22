import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import * as styles from '../../../css/events.module.css';
import EditEvent from '../container/EditEvent';
import owenShaw from '../../../img/owen shaw.jpg';

const EventsListWithImage = ({
  events, isAdmin, loggedIn, deleteEvent, changeEvent, centerId
}) => {
  const modalClasses = classNames('modal', styles['edit-event-modal']);
  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <div className="col s12 m6 l4 hvr-grow">
            <div className="card z-depth-2">
              <Link to={`/events/${event.id}`}>
                <div className="card-image">
                  <img src={owenShaw} alt={`${event.name}`} className="event-image" />
                </div>
                <div className="card-content">
                  <span className={styles['event-focus']}>{event.name}</span><br />
                  <span className={styles['event-date']}>{moment(event.date).format('LL')}</span><br />
                  <span className={styles['fifteen-percent']}>{moment(event.date).format('LT')}</span>
                </div>
              </Link>
              { isAdmin || loggedIn ? (
                <div className="card-action">
                  <React.Fragment>
                    <button
                      href={`#editEventModal${event.id}`}
                      onClick={() => changeEvent(event.id)}
                      className="waves-effect waves-light btn navbar-purple round-btn white-color left-align modal-trigger"
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="waves-effect waves-light btn navbar-purple round-btn white-color right"
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </React.Fragment>
                </div>
              ) : (
                <React.Fragment />
              )}
            </div>
          </div>
          <div className={modalClasses} id={`editEventModal${event.id}`}>
            <div className="modal-content">
              <EditEvent eventId={event.id} centerId={centerId} />
            </div>
          </div>
        </div>
    ))}
    </div>
  );
};
EventsListWithImage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool,
  deleteEvent: PropTypes.func,
  changeEvent: PropTypes.func,
  centerId: PropTypes.number
};
EventsListWithImage.defaultProps = {
  loggedIn: false,
  deleteEvent: () => {},
  changeEvent: () => {},
  centerId: 1
};
export default EventsListWithImage;
