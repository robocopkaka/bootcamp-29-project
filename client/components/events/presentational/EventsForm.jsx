import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Input } from 'react-materialize';
import * as styles from '../../../css/index.module.css';

const navbarPurpleClasses = classNames('btn', 'waves-effect', 'waves-light', styles['navbar-purple'], styles['round-btn']);

const EventsForm = ({
  name, date, detail, guests, nameClasses, dateClasses,
  detailClasses, guestsClasses, saveOrUpdate, handleChange, component, handleDateChange
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
        <Row>
          <Input name="on" type="date" onChange={handleDateChange} />
        </Row>
        { component !== 'Edit' ? (
          <label htmlFor="event-date" className="active">Date</label>
        ) : (
          <label htmlFor="event-date" className="active">Date</label>
        )}
        <span className={dateClasses}>{date.message}</span>
      </div>
    </div>
    { /* <div className="row">
      <div className="input-field col s12">
        <div className="input-field col s12">
          <Row>
            <Input s={6} type='select' label="Category" defaultValue='1'>
              <option value={category.value}>General</option>
            </Input>
          </Row>
          <span className={categoryClasses}>{category.message}</span>
        </div>
      </div>
    </div> */ }
    <div className="row center-align">
      <button
        className={navbarPurpleClasses}
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
  nameClasses: PropTypes.string.isRequired,
  detailClasses: PropTypes.string.isRequired,
  dateClasses: PropTypes.string.isRequired,
  guestsClasses: PropTypes.string.isRequired,
  component: PropTypes.string,
  saveOrUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func
};
EventsForm.defaultProps = {
  component: '',
  handleDateChange: () => {}
};
export default EventsForm;
