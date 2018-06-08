import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import * as styles from '../../../css/events.module.css';
import * as indexStyles from '../../../css/index.module.css';
import owenShaw from '../../../img/owen shaw.jpg';

const navbarPurpleLeftClasses = classNames(
  'btn', 'waves-effect', 'waves-light', indexStyles['navbar-purple'],
  indexStyles['round-btn'], 'left-align', indexStyles['white-color']
);
const navbarPurpleRightClasses = classNames(
  'btn', 'waves-effect', 'waves-light', indexStyles['navbar-purple'],
  indexStyles['round-btn'], 'right', indexStyles['white-color']
);
const hvrClasses = classNames('col', 's12', 'm6', 'l4', indexStyles['hvr-grow']);

const EventsListWithImage = ({
  events, isAdmin, loggedIn, deleteEvent, changeEvent, centerId, toggleEdit, showModal
}) => (
  <div>
    {events.map(event => (
      <div className={hvrClasses} key={event.id}>
        <div className="card z-depth-2">
          <a href={`/events/${event.id}`}>
            <div className="card-image">
              <img src="https://event-managers.s3.amazonaws.com/rentals.jpg" alt={`${event.name}`} className={indexStyles['event-image']} />
            </div>
            <div className="card-content">
              <span className={styles['event-focus']}>{event.name}</span><br />
              <span className={styles['event-date']}>{moment(event.date).format('LL')}</span><br />
              <span className={styles['fifteen-percent']}>{moment(event.date).format('LT')}</span>
            </div>
          </a>
          { isAdmin || loggedIn ? (
            <div className="card-action">
              <React.Fragment>
                <button
                  onClick={() => { changeEvent(event.id); toggleEdit(); showModal(); }}
                  className={navbarPurpleLeftClasses}
                  id={`edit-event-${event.id}`}
                >
                  <i className="material-icons">edit</i>
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className={navbarPurpleRightClasses}
                  id={`delete-event-${event.id}`}
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
  ))}
  </div>
);
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
