import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../css/centers.module.css';

const CenterList = ({ centers }) => (
  <div>
    {centers.map(center => (
      <div className="col s12 m6 l4" key={center.id}>
        <div className="card">
          <div className="card-image">
            <a href="show-center.html"><img src={center.image} alt="" /></a>
          </div>
          <div className="card-content">
            <span className={styles['center-name']}>
              <a href="show-center.html">{center.name}</a>
            </span><br />
            <span className={styles['center-state']}>
              <a href="show-center.html">{center.state}</a>
            </span><br />
            <span className={styles['center-address']}>{center.address}</span>
          </div>
          <div className="card-action">
            <a
              className="waves-effect waves-light btn navbar-purple round-btn white-color"
              href="show-center.html"
            >
              View
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
);
CenterList.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default CenterList;
