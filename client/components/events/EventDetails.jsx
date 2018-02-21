import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as eventStyles from '../../css/events.module.css';
import * as centerStyles from '../../css/centers.module.css';

const EventDetails = ({ event, center }) => (
  <div className="col s12 m8 l8">
    <div className="row">
      <div className="col s12 m8 l8">
        <div className="card">
          <div className="card-image">
            <img src="img/owen shaw.jpg" alt="" className="responsive-img" />
            <span className="card-title">{event.name}</span>
          </div>
          <div className="card-content">
            <p id={centerStyles['show-center-address']}>{event.detail}</p><br />
            <span id={centerStyles['show-center-state']}>
              Venue: {center.address}, {center.state}
            </span><br />
            <span className={eventStyles['event-date']}>{moment(event.date).format('LT')}</span>
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
    centerId: PropTypes.string,
    categoryId: PropTypes.string,
    userId: PropTypes.string,
    Center: PropTypes.object
  }).isRequired,
};
export default EventDetails;
