import React from 'react';
import PropTypes from 'prop-types';

const EventsList = ({ events }) => (
  <div>
    { /* <div className="show-center-top"><span className="date">Thursday, November 22</span></div> */ }
    <div className="row">
      {events.map(event => (
        <div className="col s12 m12 l12">
          <div className="card-panel horizontal">
            <div className="row event-row">
              <div className="fifteen-percent col s3 m3 l3">
                <span>{event.date}</span>
              </div>
              <div className="eighty-five-percent col s9 m9 l9">
                <span className="event-focus">
                  <a href="show-event.html">{event.name}</a>
                </span><br />
                <span className="event-title">
                  <a href="show-event.html">{event.guests}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
EventsList.propTypes = {
  events: PropTypes.objectOf.isRequired
};
export default EventsList;
