import React from 'react';
import PropTypes from 'prop-types';

const EventsForm = ({
  name, date, detail, guests, nameClasses, dateClasses,
  detailClasses, guestsClasses, category,
  categoryClasses, saveOrUpdate, handleChange, component,
  handleSelectCategoryChange, SelectField, MenuItem, DateTimePicker,
  DatePickerDialog, TimePickerDialog, handleDateChange
}) => (
  <form>
    <div className="row">
      <div className="input-field col s12">
        <input
          id="event-name"
          name="name"
          value={name.value}
          type="text"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="event-name">Name</label>
        ) : (
          <label htmlFor="event-name" className="active">Name</label>
        )}
        <span className={nameClasses}>{name.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <textarea
          id="event-detail"
          name="detail"
          value={detail.value}
          className="materialize-textarea validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="event-detail">Detail</label>
        ) : (
          <label htmlFor="event-detail" className="active">Detail</label>
        )}
        <span className={detailClasses}>{detail.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s6">
        <input
          id="event-guests"
          name="guests"
          value={guests.value}
          type="number"
          className="validate"
          onChange={handleChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="event-guests">Guests</label>
        ) : (
          <label htmlFor="event-guests" className="active">Guests</label>
        )}
        <span className={guestsClasses}>{guests.message}</span>
      </div>
      <div className="input-field col s6">
        <DateTimePicker
          DatePicker={DatePickerDialog}
          TimePicker={TimePickerDialog}
          value={date.value}
          onChange={handleDateChange}
        />
        { component !== 'Edit' ? (
          <label htmlFor="event-date" className="active">Date</label>
        ) : (
          <label htmlFor="event-date" className="active">Date</label>
        )}
        <span className={dateClasses}>{date.message}</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12">
        <div className="input-field col s12">
          <SelectField
            floatingLabelText="Category"
            value={category.value}
            onChange={handleSelectCategoryChange}
            id="event-category"
          >
            <MenuItem value={1} primaryText="General" />
          </SelectField>
          <span className={categoryClasses}>{category.message}</span>
        </div>
      </div>
    </div>
    <div className="row center-align">
      <button
        className="btn waves-effect waves-light navbar-purple round-btn"
        type="submit"
        name="action"
        onClick={saveOrUpdate}
      > { component !== 'Edit' ? 'Add Event' : 'Update Event' }
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
  category: PropTypes.shape({
    value: PropTypes.number,
    message: PropTypes.string,
    isValid: PropTypes.bool
  }).isRequired,
  nameClasses: PropTypes.string.isRequired,
  detailClasses: PropTypes.string.isRequired,
  dateClasses: PropTypes.string.isRequired,
  guestsClasses: PropTypes.string.isRequired,
  categoryClasses: PropTypes.string.isRequired,
  component: PropTypes.string,
  saveOrUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelectCategoryChange: PropTypes.func.isRequired,
  SelectField: PropTypes.func.isRequired
};
EventsForm.defaultProps = {
  component: ''
};
export default EventsForm;
