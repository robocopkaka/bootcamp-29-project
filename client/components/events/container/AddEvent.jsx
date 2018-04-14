import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import validator from 'validator';
import classNames from 'classnames';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as eventActions from '../../../actions/eventActions';
import * as centerActions from '../../../actions/centerActions';
import EventsForm from '../presentational/EventsForm';
import history from '../../../history';

export class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' },
      guests: { value: '', isValid: true, message: '' },
      date: { value: '', isValid: true, message: '' },
      time: { value: '', isValid: true, message: '' },
      center: { value: 1, isValid: true, message: '' },
      category: { value: '', isValid: true, message: '' },
      centers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSelectCenterChange = this.handleSelectCenterChange.bind(this);
    this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  componentDidMount() {
    if (this.props.centers.length === 0) {
      this.props.actions.fetchCenters();
    }
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
      onSet: this.handleDateChange
    });
    const time = $('#event-time');
    // const value = $('#event-time').attr('value');
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: () => {},
    });
    $('.timepicker').on('change', () => {
      this.handleTimeChange(time.val());
    });
    $('select').material_select();
    // const center = $('#event-center');
    const category = $('#event-category');
    // $('#event-center').on('change', () => {
    //   this.handleSelectCenterChange(center.val());
    // });
    $('#event-category').on('change', () => {
      this.handleSelectCategoryChange(category.val());
    });
    $('select').on('contentChanged', () => {
      $(this).material_select();
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.centers && nextProps.centers.length > 0) {
      this.setState({ centers: nextProps.centers });
    }
  }
  handleChange(event) {
    const { state } = this;
    const { name, value } = event.target;
    const field = state[name];
    field.value = value;
    this.setState({
      [field]: [field]
    });
  }
  handleDateChange(e) {
    this.setState({
      date: Object.assign({}, this.state.date, { value: moment(e.select).format('LL') })
    });
  }
  handleSelectCenterChange(event, target, value) {
    this.setState({
      center: Object.assign({}, this.state.center, { value })
    });
  }
  handleSelectCategoryChange(e) {
    this.setState({
      category: Object.assign({}, this.state.category, { value: e })
    });
  }
  handleTimeChange(e) {
    this.setState({
      time: Object.assign({}, this.state.time, { value: moment(e, 'HH:mm a').format('HH:mm:ss') })
    });
  }
  formIsValid() {
    let fieldCheck = true;
    const state = Object.assign({}, this.state);

    if (validator.isEmpty(state.name.value)) {
      state.name.isValid = false;
      state.name.message = 'Name must not be empty';

      this.setState({ name: state.name });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.guests.value)) {
      state.guests.isValid = false;
      state.guests.message = 'Guests must not be empty';

      this.setState({ guests: state.guests });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.detail.value)) {
      state.detail.isValid = false;
      state.detail.message = 'Detail must not be empty';

      this.setState({ detail: state.detail });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.date.value)) {
      state.date.isValid = false;
      state.date.message = 'Date must not be empty';

      this.setState({ date: state.date });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.time.value)) {
      state.time.isValid = false;
      state.time.message = 'Time must not be empty';

      this.setState({ time: state.time });
      fieldCheck = false;
    }
    if (validator.isEmpty((state.center.value).toString())) {
      state.center.isValid = false;
      state.center.message = 'Select a center';

      this.setState({ center: state.center });
      fieldCheck = false;
    }
    if (validator.isEmpty(state.category.value)) {
      state.category.isValid = false;
      state.category.message = 'Select a category';

      this.setState({ category: state.category });
      fieldCheck = false;
    }
    if (!fieldCheck) {
      return false;
    }
    return true;
  }
  resetValidationStates() {
    const state = Object.assign({}, this.state);

    Object.keys(state).forEach((key) => {
      if ({}.hasOwnProperty.call(state[key], 'isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    this.setState(state);
  }
  clearFields() {
    this.setState({
      name: {
        value: '', isValid: true, message: ''
      }
    });
    this.setState({ guests: { value: '', isValid: true, message: '' } });
    this.setState({ date: { value: '', isValid: true, message: '' } });
    this.setState({ time: { value: '', isValid: true, message: '' } });
    this.setState({ detail: { value: '', isValid: true, message: '' } });
    this.setState({ center: { value: '', isValid: true, message: '' } });
    this.setState({ category: { value: '', isValid: true, message: '' } });
  }
  addEvent(e) {
    e.preventDefault();
    this.resetValidationStates();
    const datetime = `${this.state.date.value} ${this.state.time.value}`;
    const eventObject = {
      name: this.state.name.value,
      detail: this.state.detail.value,
      guests: this.state.guests.value,
      date: moment(datetime).format('YYYY-MM-DD HH:mm:ss'),
      centerId: this.state.center.value,
      categoryId: this.state.category.value
    };
    if (this.formIsValid()) {
      this.props.actions.addEvent(eventObject)
        .then((response) => {
          Materialize.toast(response, 4000, 'green');
          history.push('/events');
        })
        .catch(error => Materialize.toast(error, 4000, 'red'));
    }
  }
  render() {
    const { centers = [] } = this.props;
    const nameClasses = classNames('help-block', { 'has-error': !this.state.name.isValid });
    const detailClasses = classNames('help-block', { 'has-error': !this.state.detail.isValid });
    const guestsClasses = classNames('help-block', { 'has-error': !this.state.guests.isValid });
    const dateClasses = classNames('help-block', { 'has-error': !this.state.date.isValid });
    const timeClasses = classNames('help-block', { 'has-error': !this.state.time.isValid });
    const centerClasses = classNames('help-block', { 'has-error': !this.state.center.isValid });
    const categoryClasses = classNames('help-block', { 'has-error': !this.state.category.isValid });
    const containerClasses = classNames('container max-width-six-hundred');
    return (
      <div className={containerClasses}>
        <div className="card">
          <div className="container">
            <h3 className="center-heading">Add an Event</h3>
          </div>
          <EventsForm
            name={this.state.name}
            guests={this.state.guests}
            center={this.state.center}
            category={this.state.category}
            date={this.state.date}
            time={this.state.time}
            detail={this.state.detail}
            nameClasses={nameClasses}
            guestsClasses={guestsClasses}
            dateClasses={dateClasses}
            timeClasses={timeClasses}
            centerClasses={centerClasses}
            categoryClasses={categoryClasses}
            detailClasses={detailClasses}
            saveOrUpdate={this.addEvent}
            handleChange={this.handleChange}
            handleTimeChange={this.handleTimeChange}
            handleSelectCenterChange={this.handleSelectCenterChange}
            handleSelectCategoryChange={this.handleSelectCategoryChange}
            centers={centers}
            SelectField={SelectField}
            MenuItem={MenuItem}
          />
        </div>
      </div>
    );
  }
}
AddEvent.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired
};
function mapStateToProps(state) {
  let centers = [];
  if (state.centers.centers && state.centers.centers.length > 0) {
    ({ centers: { centers } } = state);
  }
  return {
    centers
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, eventActions, centerActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
