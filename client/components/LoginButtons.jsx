import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as styles from '../css/index.module.css';

const homeButtonRight = classNames('waves-effect', 'waves-light', 'btn', styles['home-button-right']);
const homeButtonLeft = classNames('waves-effect', 'waves-light', 'btn', styles['home-button-left']);

const LoginButtons = ({ showModal, toggleSignup }) => (
  <React.Fragment>
    <button
      onClick={() => { showModal(); toggleSignup(); }}
      className={homeButtonLeft}
    >Signup
    </button>
    <button
      onClick={showModal}
      className={homeButtonRight}
    >Login
    </button>
  </React.Fragment>
);
LoginButtons.propTypes = {
  showModal: PropTypes.func,
  toggleSignup: PropTypes.func
};
LoginButtons.defaultProps = {
  showModal: () => {},
  toggleSignup: () => {}
};
export default LoginButtons;
