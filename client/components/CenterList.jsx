import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as styles from '../css/centers.module.css';

const CenterList = ({ centers, isAdmin }) => (
  <div>
    {centers.map(center => (
      <div className="col s12 m6 l4" key={center.id}>
        <div className="card">
          <div className="card-image">
            <Link to={`/centers/${center.id}`}><img src={center.image} alt="" /></Link>
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
            <Link
              to={`/centers/${center.id}`}
              className="waves-effect waves-light btn navbar-purple round-btn white-color"
            >
              View
            </Link>
            { isAdmin ? (
              <Link
                to={`/centers/${center.id}/edit`}
                className="waves-effect waves-light btn navbar-purple round-btn white-color"
              >
                <i className="material-icons">edit</i>
              </Link>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);
CenterList.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired
};
export default CenterList;
