import React from 'react';

const Footer = () => (
  <footer className="page-footer navbar-purple index-footer footer-padding">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">EventManager</h5>
          <p className="grey-text text-lighten-4">Find centers for your events</p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Useful links</h5>
          <ul>
            <li><a className="white-text" href="all-events.html">All Events</a></li>
            <li><a className="white-text" href="all-centers.html">All Centers</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
