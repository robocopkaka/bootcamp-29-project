import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../../../css/centers.module.css';

const CenterDetail = ({ center }) => (
  <div className="center-detail-container">
    <div className="row">
      <div className="col s12 l8 m12">
        <img src={center.image} alt={`${center.name}`} className={styles['show-center-image']} />
      </div>
      <div className="col s12 l4 m12">
        <h1>{center.name}</h1>
        <React.Fragment>
          <p className={styles.tiny}>
            <span className={styles['tiny-span']}>Location</span>
          </p>
          <p className={styles['show-center-details']}>{`${center.address}, ${center.state}`}</p>
        </React.Fragment>
        <div>
          <div className="show-center-chairs">
            <p className={styles.tiny}>
              <span className={styles['tiny-span']}>Chairs</span>
            </p>
            <p className={styles['show-center-details']}>{center.chairs}</p>
          </div>
          <div className="show-center-projector">
            <p className={styles.tiny}>
              <span className={styles['tiny-span']}>Projectors</span>
            </p>
            <p className={styles['show-center-details']}>{center.projector}</p>
          </div>
          <div>
            <p className={styles.tiny}>
              <span className={styles['tiny-span']}>Detail</span>
            </p>
            <p className={styles['show-center-details']}>{center.detail}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
// CenterDetail.propTypes = {
//   center: PropTypes.objectOf().isRequired
// };
export default CenterDetail;
