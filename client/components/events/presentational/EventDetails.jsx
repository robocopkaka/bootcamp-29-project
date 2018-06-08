import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as eventStyles from '../../../css/events.module.css';
import * as centerStyles from '../../../css/centers.module.css';

const EventDetails = ({ event, center }) => (
  <div className="single-event-container">
    <div className="row" id={eventStyles['single-event-row']}>
      <div>
        <img src="https://s3-us-west-1.amazonaws.com/event-managers/ramsey.jpg" alt="Event image" className="responsive-img col s12 m12 l8 large-event-image" />
      </div>
      <div className="col s12 m12 l4" id={eventStyles['event-details-padding']}>
        <h1 id={eventStyles['break-word']}>{event.name}</h1>
        <React.Fragment>
          <p className={eventStyles.tiny}>
            <span className={eventStyles['tiny-span']}>Date</span>
          </p>
          <p className={eventStyles['show-event-details']}>{moment(event.date).format('LL')}</p>
        </React.Fragment>
        <div>
          <div className="show-event-time">
            <p className={eventStyles.tiny}>
              <span className={eventStyles['tiny-span']}>Time</span>
            </p>
            <p className={eventStyles['show-event-details']}>{moment(event.date).format('LT')}</p>
          </div>
          <div>
            <p className={eventStyles.tiny}>
              <span className={eventStyles['tiny-span']}>Guest</span>
            </p>
            <p className={eventStyles['show-event-details']}>{event.guests}</p>
          </div>
        </div>
      </div>
    </div>
    <div className={eventStyles['single-event-details']}>
      <div>
        <h2 className={eventStyles['event-detail']}>
          <span id={eventStyles['event-detail-span']}>Event Details</span>
        </h2>
        <p id={eventStyles['event-detail-text']}>{event.detail}</p>
      </div>
    </div>
  </div>
);
EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    guests: PropTypes.number,
    detail: PropTypes.string,
    status: PropTypes.string,
    centerId: PropTypes.number,
    categoryId: PropTypes.number,
    userId: PropTypes.number,
    Center: PropTypes.object
  }).isRequired,
  center: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    capacity: PropTypes.number,
    detail: PropTypes.string,
    chairs: PropTypes.number,
    projector: PropTypes.number,
    address: PropTypes.string,
    state: PropTypes.string,
    image: PropTypes.string,
  }).isRequired
};
export default EventDetails;
