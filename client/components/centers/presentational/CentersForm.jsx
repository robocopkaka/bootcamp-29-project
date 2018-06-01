import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as indexStyles from '../../../css/index.module.css';

const navbarPurpleClasses = classNames(
  'waves-effect', 'waves-light', 'btn', indexStyles['round-btn'],
  indexStyles['white-color'], indexStyles['navbar-purple']
);
const navbarPurpleButton = classNames('btn', indexStyles['round-btn'], indexStyles['navbar-purple']);


const CentersForm = ({
  name, address, capacity, chairs, projector, state, detail, handleChange,
  nameClasses, detailClasses, capacityClasses, addressClasses, stateClasses, saveOrUpdate,
  component, image
}) => (
  <form>
    <div className="row">
      <div className="input-field col s12">
        <input
          id="center-name"
          name="name"
          value={name.value}
          type="text"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-name">Name</label>
        ) : (
          <label htmlFor="center-name" className="active">Name</label>
        )}
        <span className={nameClasses}>{name.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <input
          id="center-address"
          name="address"
          value={address.value}
          type="text"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-address">Address</label>
        ) : (
          <label htmlFor="center-address" className="active">Address</label>
        )}
        <span className={addressClasses}>{address.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <input
          id="center-state"
          name="state"
          value={state.value}
          type="text"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-state">State</label>
        ) : (
          <label htmlFor="center-state" className="active">State</label>
        )}
        <span className={stateClasses}>{state.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s4">
        <input
          id="center-capacity"
          name="capacity"
          value={capacity.value}
          type="number"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-capacity">Capacity</label>
        ) : (
          <label htmlFor="center-capacity" className="active">Capacity</label>
        )}
        <span className={capacityClasses}>{capacity.message}</span>
      </div>
      <div className="input-field col s4">
        <input
          id="center-chairs"
          name="chairs"
          value={chairs.value}
          type="number"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-chairs">Chairs</label>
        ) : (
          <label htmlFor="center-chairs" className="active">Chairs</label>
        )}
      </div>
      <div className="input-field col s4">
        <input
          id="center-projector"
          name="projector"
          value={projector.value}
          type="number"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-projector">Projector</label>
        ) : (
          <label htmlFor="center-projector" className="active">Projector</label>
        )}
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <textarea
          id="center-detail"
          name="detail"
          value={detail.value}
          className="materialize-textarea validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="center-detail">Detail</label>
        ) : (
          <label htmlFor="center-detail" className="active">Detail</label>
        )}
        <span className={detailClasses}>{detail.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="file-field input-field">
        <div className={navbarPurpleButton}>
          <span>Image</span>
          <input
            type="file"
            name="imageUpload"
            onChange={handleChange}
          />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            name="image"
            type="text"
            value={image.value}
          />
        </div>
      </div>
    </div>
    <div className="row center-align">
      {component === 'Edit' ? (
        <button
          className={navbarPurpleClasses}
          type="submit"
          name="action"
          onClick={saveOrUpdate}
        >
          Update Center
          <i className="material-icons right">send</i>
        </button>
      ) : (
        <button
          className={navbarPurpleClasses}
          type="submit"
          name="action"
          onClick={saveOrUpdate}
        >
          Add Center
          <i className="material-icons right">send</i>
        </button>
      )}
    </div>
  </form>
);
CentersForm.propTypes = {
  name: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  detail: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  address: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  capacity: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  chairs: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  projector: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  state: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  image: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  nameClasses: PropTypes.string.isRequired,
  detailClasses: PropTypes.string.isRequired,
  capacityClasses: PropTypes.string.isRequired,
  stateClasses: PropTypes.string.isRequired,
  addressClasses: PropTypes.string.isRequired,
  saveOrUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  component: PropTypes.string
};
CentersForm.defaultProps = {
  component: ''
};
export default CentersForm;
