import React from 'react';
import PropTypes from 'prop-types';

const CentersForm = ({
  name, email, address, capacity, chairs, projector, state, detail, handleChange,
  nameClasses, detailClasses, capacityClasses, addressClasses, stateClasses,
  handleImageChange, addCenter
}) => (
  <form className="card-content">
    <div className="row">
      <div className="input-field col s12">
        <input
          id="center-name"
          name="name"
          value={name.value}
          type="text"
          className="validate"
          onChange={() => handleChange}
        />
        <label for="center-name">Name</label>
        <span className={nameClasses}>{name.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <input
          id="center-address"
          name="address"
          value={this.state.address.value}
          type="text"
          className="validate"
          onChange={this.handleChange}
        />
        <label for="center-address">Address</label>
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
          onChange={() => handleChange}
        />
        <label for="center-state">State</label>
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
          onChange={() => handleChange}
        />
      <label for="center-capacity">Capacity</label>
        <span className={capacityClasses}>{capacity.message}</span>
      </div>
      <div className="input-field col s4">
        <input
          id="center-chairs"
          name="chairs"
          value={chairs.value}
          type="number"
          className="validate"
          onChange={() => handleChange}
        />
        <label for="center-state">Chairs</label>
      </div>
      <div className="input-field col s4">
        <input
          id="center-projector"
          name="projector"
          value={projector.value}
          type="number"
          className="validate"
          onChange={() => handleChange}
        />
        <label for="center-projector">Projector</label>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <textarea
          id="center-detail"
          name="detail"
          value={detail.value}
          className="materialize-textarea validate"
          onChange={() => handleChange}
        ></textarea>
      <label for="center-detail">Detail</label>
        <span className={detailClasses}>{detail.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="file-field input-field">
        <div className="btn navbar-purple round-btn">
          <span>Image</span>
          <input
            type="file"
            name="image"
            onChange={() => handleImageChange}
          />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="row center-align">
      <button
        className="btn waves-effect waves-light navbar-purple round-btn"
        type="submit"
        name="action"
        onClick={() => addCenter}
      >
        Add Center
        <i className="material-icons right">send</i>
      </button>
    </div>
  </form>
);
CentersForm.propTypes = {
  name: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  chairs: PropTypes.string.isRequired,
  projector: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  nameClasses: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default CentersForm;
