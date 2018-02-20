import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as styles from '../../css/events.module.css';

const EventsListWithImage = ({ events }) => {
  return (
    <div>
      {events.map(event => (
        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-image">
              <a href="show-event.html"><img src="img/owen shaw.jpg" alt="" /></a>
            </div>
            <div className="card-content">
              <span className={styles['event-focus']}><a href="show-event.html">{event.name}</a></span><br />
              <span
                className={styles['event-title']}
              >
                <a href="show-event.html">{event.detail}</a>
              </span><br />
            <span className={styles['event-date']}>{moment(event.date).format('LL')}</span><br />
              <span className={styles['fifteen-percent']}>{moment(event.date).format('LT')}</span>
            </div>
            <div className="card-action">
              <a
                clasNames="waves-effect waves-light btn navbar-purple round-btn white-color"
                href="show-event.html"
              >
                View
              </a>
            </div>
          </div>
        </div>
    ))}
    </div>
  );
};
export default EventsListWithImage;
