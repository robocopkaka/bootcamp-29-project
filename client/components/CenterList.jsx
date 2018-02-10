import React from 'react';
import PropTypes from 'prop-types';

const CenterList = ({ centers }) => {
  return (
    <div>
      {centers.map(center => (
        <div className="col s12 m6 l4" key={center.id}>
          <div className="card">
            <div className="card-image">
              <a href="show-center.html"><img src={center.image} alt="" /></a>
            </div>
            <div className="card-content">
              <span className="center-name">
                <a href="show-center.html">{center.name}</a>
              </span><br />
              <span className="center-state">
                <a href="show-center.html">{center.state}</a>
              </span><br />
              <span className="center-address">{center.address}</span>
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
};
CenterList.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default CenterList;
