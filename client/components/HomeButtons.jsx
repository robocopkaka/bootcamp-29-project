import React from 'react';
import { Link } from 'react-router-dom';

const HomeButtons = () => (
  <div>
    <Link
      to="/events"
      className="waves-effect waves-light btn home-button-right"
    >
    Events
    </Link>
    <Link
      to="/centers"
      className="waves-effect waves-light btn home-button-left"
    >Centers
    </Link>
  </div>
);
export default HomeButtons;
