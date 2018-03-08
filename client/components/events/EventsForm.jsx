import React from 'react';
import PropTypes from 'prop-types';

const EventsForm = ({
  name, date, detail, guests, time, center, nameClasses, dateClasses,
  detailClasses, guestsClasses, timeClasses, centerClasses, category,
  categoryClasses, saveOrUpdate, handleChange
}) => (
  <form className="card-content">
    <div className="row">
      <div className="input-field col s12">
        <input
          id="event-name"
          name="name"
          value={this.state.name.value}
          type="text"
          className="validate"
          onChange={this.handleChange}
        />
        <label for="event-name">Name</label>
        <span className={nameClasses}>{this.state.name.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <textarea
          id="event-detail"
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
      <div className="input-field col s6">
        <input
          id="event-guests"
          name="guests"
          value={this.state.guests.value}
          type="number"
          className="validate"
          onChange={this.handleChange}
        />
        <label for="event-guests">Guests</label>
        <span className={guestsClasses}>{this.state.guests.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <input
          name="date"
          value={this.state.date.value}
          type="text"
          className="datepicker"
          id="event-date"
        />
        <label for="event-date">Date</label>
        <span className={dateClasses}>{this.state.date.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <input
          id="event-time"
          name="time"
          value={this.state.time.value}
          className="timepicker"
          type="text"
          onChange={this.handleTimeChange}
        />
        <label for="event-time">Time</label>
        <span className={timeClasses}>{this.state.time.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s16">
        <select
          name="center"
          value={this.state.center.value}
          onChange={this.handleSelectCenterChange}
          id="event-center"
        >
          <option value="">Pick a Center</option>
          {centers.map(center => (
            <option
              key={center.id}
              value={center.id}
            >{center.name}
            </option>
          ))}
        </select>
        <label htmlFor="event-center">Center</label>
        <span className={centerClasses}>{this.state.center.message}</span>
      </div>
      <div className="input-field col s16">
        <select
          name="category"
          value={this.state.category.value}
          onChange={this.handleSelectCategoryChange}
          id="event-category"
        >
          <option value="1">General</option>
        </select>
        <label htmlFor="event-category">Category</label>
        <span className={categoryClasses}>{this.state.category.message}</span>
      </div>
    </div>
    <div className="row center-align">
      <button
        className="btn waves-effect waves-light navbar-purple round-btn"
        type="submit"
        name="action"
        onClick={this.addEvent}
      >Add Event
        <i className="material-icons right">send</i>
      </button>
    </div>
  </form>
);
EventsForm.propTypes = {
  name: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  time: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  date: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  guests: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  detail: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  center: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  category: PropTypes.shape({
    value: PropTypes.string,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  nameClasses: PropTypes.string.isRequired,
  detailClasses: PropTypes.string.isRequired,
  dateClasses: PropTypes.string.isRequired,
  timeClasses: PropTypes.string.isRequired,
  centerClasses: PropTypes.string.isRequired,
  guestsClasses: PropTypes.string.isRequired,
  categoryClasses: PropTypes.string.isRequired,
  saveOrUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default EventsForm;
