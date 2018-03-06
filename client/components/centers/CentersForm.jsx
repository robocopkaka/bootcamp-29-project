import React from 'react';

const CentersForm = () => (
  <div className="container max-width-six-hundred">
    <div className="card">
      <div className="container">
        <h3 className="center-heading">Add a Center</h3>
      </div>
      <form className="card-content">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="center-name"
              name="name"
              value={this.state.name.value}
              type="text"
              className="validate"
              onChange={this.handleChange}
            />
            <label for="center-name">Name</label>
            <span className={nameClasses}>{this.state.name.message}</span>
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
            <span className={addressClasses}>{this.state.address.message}</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="center-state"
              name="state"
              value={this.state.state.value}
              type="text"
              className="validate"
              onChange={this.handleChange}
            />
            <label for="center-state">State</label>
            <span className={stateClasses}>{this.state.state.message}</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s4">
            <input
              id="center-capacity"
              name="capacity"
              value={this.state.capacity.value}
              type="number"
              className="validate"
              onChange={this.handleChange}
            />
          <label for="center-capacity">Capacity</label>
            <span className={capacityClasses}>{this.state.capacity.message}</span>
          </div>
          <div className="input-field col s4">
            <input
              id="center-chairs"
              name="chairs"
              value={this.state.chairs.value}
              type="number"
              className="validate"
              onChange={this.handleChange}
            />
            <label for="center-state">Chairs</label>
          </div>
          <div className="input-field col s4">
            <input
              id="center-projector"
              name="projector"
              value={this.state.projector.value}
              type="number"
              className="validate"
              onChange={this.handleChange}
            />
            <label for="center-projector">Projector</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="center-detail"
              name="detail"
              value={this.state.detail.value}
              className="materialize-textarea validate"
              onChange={this.handleChange}
            ></textarea>
          <label for="center-detail">Detail</label>
            <span className={detailClasses}>{this.state.detail.message}</span>
          </div>
        </div>
        <div className="row">
          <div className="file-field input-field">
            <div className="btn navbar-purple round-btn">
              <span>Image</span>
              <input
                type="file"
                name="image"
                onChange={this.handleImageChange}
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
            onClick={this.addCenter}
          >
            Add Center
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  </div>
);
