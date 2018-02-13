import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from '../../css/events.module.css';

const EventsList = ({ events }) => {
  const eightFivePercentClasses = classNames('col', 's9', 'm9', 'l9', styles['eighty-five-percent']);
  const fifteenPercentClasses = classNames(styles['ifteen-percent'], 'col', 's3', 'm3', 'l3');
  return (
    <div>
      { /*
        <div className="show-center-top"><span className="date">Thursday, November 22</span></div>
      */ }
      <div className="row">
        {events.map(event => (
          <div className="col s12 m12 l12" key={event.id}>
            <div className="card-panel horizontal">
              <div className="row">
                <div className={fifteenPercentClasses}>
                  <span>{moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                </div>
                <div className={eightFivePercentClasses}>
                  <span className={styles['event-focus']}>
                    <a href="show-event.html">{event.name}</a>
                  </span><br />
                  <span className="event-title">
                    <a href="show-event.html">{event.detail}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default EventsList;