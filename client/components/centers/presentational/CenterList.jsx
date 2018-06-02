import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import * as styles from '../../../css/centers.module.css';
import * as indexStyles from '../../../css/index.module.css';

const navbarPurpleClasses = classNames('waves-effect', 'waves-light', 'btn',
  indexStyles['round-btn'], indexStyles['white-color'], indexStyles['navbar-purple']
);

const hvrClasses = classNames('col', 's12', 'm6', 'l4', indexStyles['hvr-grow']);

const CenterList = ({
  centers, isAdmin, showModal, toggleEdit, changeCenter
}) => (
  <div>
    {centers.map(center => (
      <div className={hvrClasses} key={center.id}>
        <div className="card z-depth-2">
          <Link to={`/centers/${center.id}`}>
            <div className="card-image">
              <img src={center.image} className={indexStyles['center-image']} alt={`${center.name}`} />
              { /*
               <Link to={`/centers/${center.id}`}><img src={center.image} alt="" /></Link> */ }
            </div>
            <div className="card-content">
              <span className={styles['center-name']}>
                <span>{center.name}</span>
              </span><br />
              <span className={styles['center-state']}>
                <span>{center.state}</span>
              </span><br />
              <span className={styles['center-address']}>{center.address}</span>
            </div>
          </Link>
          { isAdmin ? (
            <div className="card-action">
              <button
                onClick={() => { showModal(); toggleEdit(); changeCenter(center.id); }}
                className={navbarPurpleClasses}
              >
                <i className="material-icons">edit</i>
              </button>
            </div>
        ) : (
          <React.Fragment />
          )}
        </div>
      </div>
    ))}
  </div>
);
CenterList.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  toggleEdit: PropTypes.func,
  changeCenter: PropTypes.func
};
CenterList.defaultProps = {
  showModal: () => {},
  toggleEdit: () => {},
  changeCenter: () => {}
};
export default CenterList;
