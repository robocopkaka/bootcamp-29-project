import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginButtons = ({ showModal }) => (
  <React.Fragment>
    <Link
      to="/signup"
      className="waves-effect waves-light btn home-button-left"
    >Signup
    </Link>
    <button
      onClick={showModal}
      className="waves-effect waves-light btn home-button-right"
    >Login
    </button>
  </React.Fragment>
);
LoginButtons.propTypes = {
  showModal: PropTypes.func
};
LoginButtons.defaultProps = {
  showModal: () => {}
};
export default LoginButtons;
