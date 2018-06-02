import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import * as styles from '../css/index.module.css';

const homeButtonRight = classNames('waves-effect', 'waves-light', 'btn', styles['home-button-right']);
const homeButtonLeft = classNames('waves-effect', 'waves-light', 'btn', styles['home-button-left']);

const HomeButtons = () => (
  <div>
    <Link
      to="/events"
      className={homeButtonRight}
    >
    Events
    </Link>
    <Link
      to="/centers"
      className={homeButtonLeft}
    >Centers
    </Link>
  </div>
);
export default HomeButtons;
