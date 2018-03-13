import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import * as styles from '../../css/centers.module.css';

const Preloader = () => (
  <div className="min-height-hundred-vh">
    <div className={styles['center-loader']}>
      <CircularProgress size={80} thickness={5} />
    </div>
  </div>
);
export default Preloader;
