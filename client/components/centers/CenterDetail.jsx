import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../../css/centers.module.css';

const CenterDetail = ({ center }) => (
  <div className="row">
    <div className="col s12 m6 l6 offset-l3 offset-m3">
      <div className="card">
        <div className="card-image">
          <img src={center.image} alt="" className="responsive-img" />
          <span className="card-title">{center.name}</span>
        </div>
        <div className="card-content">
          <p id={styles['show-center-address']}>{center.address}</p>
          <p id={styles['show-center-state']}>{center.state}</p>
        </div>
        <div className="card-action">
          <a
            className="waves-effect waves-light btn navbar-purple round-btn white-color"
            href="#"
          >Book
          </a>
        </div>
      </div>
    </div>
  </div>
);
CenterDetail.propTypes = {
  center: PropTypes.objectOf.isRequired
};
export default CenterDetail;
