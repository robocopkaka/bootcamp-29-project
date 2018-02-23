import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validator from 'validator';
import moment from 'moment';
import * as eventActions from '../../actions/eventActions';

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', isValid: true, message: '' },
      detail: { value: '', isValid: true, message: '' },
      guests: { value: '', isValid: true, message: '' },
      date: { value: '', isValid: true, message: '' },
      time: { value: '', isValid: true, message: '' },
      center: { value: '1', isValid: true, message: '' },
      category: { value: '', isValid: true, message: '' },
      // centers: {}
    };
  }
  componentDidMount() {
    this.props.actions.fetchSingleEvent(parseInt(this.props.match.params.id, 10));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.event.id !== nextProps.event.id) {
      this.setState({
        name: Object.assign({}, this.state.name, { value: nextProps.event.name }),
        detail: Object.assign({}, this.state.detail, { value: nextProps.event.detail }),
        guests: Object.assign({}, this.state.guests, { value: nextProps.event.guests }),
        center: Object.assign({}, this.state.center, {
          value: (nextProps.event.centerId).toString()
        }),
        category: Object.assign({}, this.state.category, {
          value: (nextProps.event.categoryId).toString()
        })
      })
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
              >Update Event
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
};
function mapStateToProps(state) {

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
