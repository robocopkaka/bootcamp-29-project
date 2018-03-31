import React from 'react';
import { Link } from 'react-router-dom';

const LoginButtons = () => (
  <React.Fragment>
    <Link
      to="/signup"
      className="waves-effect waves-light btn home-button-left"
    >Signup
    </Link>
    <Link
      to="/login"
      className="waves-effect waves-light btn home-button-right"
    >Login
    </Link>
  </React.Fragment>
);
export default LoginButtons;
