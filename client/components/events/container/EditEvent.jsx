import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import moment from 'moment';
import * as eventActions from '../../../actions/eventActions';
import * as centerActions from '../../../actions/centerActions';
import EventsForm from '../presentational/EventsForm';
import * as styles from '../../../css/index.module.css';

export class EditEvent extends Component {
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchSingleEvent(parseInt(this.props.eventId, 10));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.event.id !== nextProps.event.id) {
      this.setState({
        name: Object.assign({}, this.state.name, { value: nextProps.event.name }),
        detail: Object.assign({}, this.state.detail, { value: nextProps.event.detail }),
        guests: Object.assign({}, this.state.guests, {
          value: (nextProps.event.guests).toString()
        }),
        center: Object.assign({}, this.state.center, {
          value: (nextProps.event.centerId).toString()
        }),
        category: Object.assign({}, this.state.category, {
          value: (nextProps.event.categoryId).toString()
        }),
        date: Object.assign({}, this.state.name, {
          value: moment(nextProps.event.date).format('LL')
        }),
        time: Object.assign({}, this.state.name, {
          value: moment(nextProps.event.date).format('LT')
        })
      });
    }
  }
  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
    const field = state[name];
    field.value = value;
    this.setState({
      [field]: [field]
    });
  }
  handleDateChange(e, date) {
    this.setState({
      date: Object.assign({}, this.state.date, { value: date })
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
  updateEvent(e) {
    e.preventDefault();
    this.resetValidationStates();
    const datetime = `${this.state.date.value}`;
    const eventObject = {
      id: parseInt(this.props.eventId, 10),
      name: this.state.name.value,
      detail: this.state.detail.value,
      guests: this.state.guests.value,
      date: moment(datetime).format('YYYY-MM-DD HH:mm:ss'),
      centerId: this.props.centerId,
      categoryId: 1
    };
    if (this.formIsValid()) {
      this.props.actions.updateEvent(eventObject)
        .then((response) => {
          Materialize.toast(response.message, 4000, 'green');
          this.props.toggleEdit();
          this.props.hideModal();
        })
        .catch(error => Materialize.toast(error, 4000, 'red'));
      // this.clearFields();
    }
  }
  render() {
    const nameClasses = classNames('help-block', { [styles['has-error']]: !this.state.name.isValid });
    const detailClasses = classNames('help-block', { [styles['has-error']]: !this.state.detail.isValid });
    const guestsClasses = classNames('help-block', { [styles['has-error']]: !this.state.guests.isValid });
    const dateClasses = classNames('help-block', { [styles['has-error']]: !this.state.date.isValid });
    const timeClasses = classNames('help-block', { [styles['has-error']]: !this.state.time.isValid });
    const containerClasses = classNames('container', styles['max-width-six-hundred']);
    return (
      <div className={containerClasses}>
        <div>
          <div className="container">
            <h3 className="center-heading">Edit an Event</h3>
          </div>
          <EventsForm
            name={this.state.name}
            guests={this.state.guests}
            date={this.state.date}
            time={this.state.time}
            detail={this.state.detail}
            nameClasses={nameClasses}
            guestsClasses={guestsClasses}
            dateClasses={dateClasses}
            timeClasses={timeClasses}
            detailClasses={detailClasses}
            saveOrUpdate={this.updateEvent}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            component="Edit"
          />
        </div>
      </div>
    );
  }
}
EditEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    guests: PropTypes.number,
    detail: PropTypes.string,
    date: PropTypes.string,
    centerId: PropTypes.number,
    categoryId: PropTypes.number,
    Center: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      capacity: PropTypes.number,
      detail: PropTypes.string,
      chairs: PropTypes.number,
      projector: PropTypes.number,
      address: PropTypes.string,
      state: PropTypes.string,
      image: PropTypes.string,
      events: PropTypes.array
    })
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  eventId: PropTypes.number,
  centerId: PropTypes.number,
  toggleEdit: PropTypes.func,
  hideModal: PropTypes.func
};
EditEvent.defaultProps = {
  eventId: 1,
  centerId: 1,
  toggleEdit: () => {},
  hideModal: () => {},
};
function mapStateToProps(state) {
  let event = {
    id: '',
    name: '',
    detail: '',
    guests: '',
    centerId: '',
    categoryId: '',
    date: '',
    Center: {}
  };
  if (state.events.event && state.events.event.id !== '') {
    ({ events: { event } } = state);
  }
  return {
    event,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(eventActions, centerActions), dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
