import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as eventStyles from '../../../css/events.module.css';
import * as centerStyles from '../../../css/centers.module.css';

const EventDetails = ({ event, center }) => (
  <div className="col s12 m8 l8">
    <div className="row">
      <div className="col s12 m8 l8">
        <div className="card">
          <div className="card-image">
            <img src={center.image} alt="" className="responsive-img" />
            <span className="card-title">{event.name}</span>
          </div>
          <div className="card-content">
            <p id={centerStyles['show-center-address']}>{event.detail}</p><br />
            <span id={centerStyles['show-center-state']}>
              Venue: {center.address}, {center.state}
            </span><br />
            <span className={eventStyles['event-date']}>{moment(event.date).format('LT')}</span><br />
            <span className={eventStyles['event-date']}>Guests: {event.guests}</span>
          </div>
        </div>
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
