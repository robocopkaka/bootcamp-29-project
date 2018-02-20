import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
              <span className="event-focus"><a href="show-event.html">{event.name}</a></span><br />
              <span
                className="event-title"
              >
                <a href="show-event.html">{event.detail}</a>
              </span><br />
              <span className="event-date">{moment(event.date).format('LL')}</span><br />
              <span className="fifteen-percent">{moment(event.date).format('h:mm a')}</span>
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
