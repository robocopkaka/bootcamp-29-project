import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginButtons = ({ showModal, toggleSignup }) => (
  <React.Fragment>
    <button
      onClick={() => { showModal(); toggleSignup(); }}
      className="waves-effect waves-light btn home-button-left"
    >Signup
    </button>
    <button
      onClick={showModal}
      className="waves-effect waves-light btn home-button-right"
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
