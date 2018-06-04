import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import validator from 'validator';
import classNames from 'classnames';
// import pickadate from 'pickadate';
import * as eventActions from '../../../actions/eventActions';
import * as centerActions from '../../../actions/centerActions';
import EventsForm from '../presentational/EventsForm';
import * as styles from '../../../css/index.module.css';

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
      category: { value: 1, isValid: true, message: '' },
      centers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   // console.log(nextProps);
  //   if (nextProps.centers && nextProps.centers.length > 0) {
  //     this.setState({ centers: nextProps.centers });
  //   }
  // }
  handleChange(event) {
    const { state } = this;
    const { name, value } = event.target;
    const field = state[name];
    field.value = value;
    this.setState({
      [field]: [field]
    });
  }
  handleDateChange(e, date) {
    this.setState({
      // date: Object.assign({}, this.state.date, { value: moment(e).format('LL') })
      date: Object.assign({}, this.state.date, { value: date })
    });
  }
  // handleSelectCategoryChange(e, target, value) {
  //   this.setState({
  //     category: Object.assign({}, this.state.category, { value })
  //   });
  // }
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
    if (validator.isEmpty((state.date.value).toString())) {
      state.date.isValid = false;
      state.date.message = 'Date must not be empty';

      this.setState({ date: state.date });
      fieldCheck = false;
    }
    // if (validator.isEmpty((state.category.value).toString())) {
    //   state.category.isValid = false;
    //   state.category.message = 'Select a category';
    //
    //   this.setState({ category: state.category });
    //   fieldCheck = false;
    // }
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
    this.setState({ category: { value: 1, isValid: true, message: '' } });
  }
  addEvent(e) {
    e.preventDefault();
    this.resetValidationStates();
    // const datetime = `${this.state.date.value} ${this.state.time.value}`;
    const eventObject = {
      name: this.state.name.value,
      detail: this.state.detail.value,
      guests: this.state.guests.value,
      date: new Date(this.state.date.value),
      centerId: this.props.centerId,
      categoryId: 1
    };
    if (this.formIsValid()) {
      this.props.actions.addEvent(eventObject)
        .then((response) => {
          Materialize.toast(response, 4000, 'green');
          this.clearFields();
          this.props.hideModal()
        })
        .catch(error => Materialize.toast(error, 4000, 'red'));
    }
  }
  render() {
    const nameClasses = classNames('help-block', { [styles['has-error']]: !this.state.name.isValid });
    const detailClasses = classNames('help-block', { [styles['has-error']]: !this.state.detail.isValid });
    const guestsClasses = classNames('help-block', { [styles['has-error']]: !this.state.guests.isValid });
    const dateClasses = classNames('help-block', { [styles['has-error']]: !this.state.date.isValid });
    const timeClasses = classNames('help-block', { [styles['has-error']]: !this.state.time.isValid });
    const centerClasses = classNames('help-block', { [styles['has-error']]: !this.state.center.isValid });
    const containerClasses = classNames('container', styles['max-width-six-hundred']);
    return (
      <div className={containerClasses}>
        <div>
          <div className="container">
            <h3 className="center-heading">Add an Event</h3>
          </div>
          <EventsForm
            name={this.state.name}
            guests={this.state.guests}
            center={this.state.center}
            date={this.state.date}
            time={this.state.time}
            detail={this.state.detail}
            nameClasses={nameClasses}
            guestsClasses={guestsClasses}
            dateClasses={dateClasses}
            timeClasses={timeClasses}
            centerClasses={centerClasses}
            detailClasses={detailClasses}
            saveOrUpdate={this.addEvent}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            handleSelectCenterChange={this.handleSelectCenterChange}
          />
        </div>
      </div>
    );
  }
}
AddEvent.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  centerId: PropTypes.number,
  hideModal: PropTypes.func,
};
AddEvent.defaultProps = {
  centerId: 1,
  hideModal: () => {},
};
// function mapStateToProps(state) {
//   let centers = [];
//   if (state.centers.centers && state.centers.centers.length > 0) {
//     ({ centers: { centers } } = state);
//   }
//   return {
//     centers
//   };
// }
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, eventActions, centerActions), dispatch)
  };
}
export default connect(null, mapDispatchToProps)(AddEvent);
