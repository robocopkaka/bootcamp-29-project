import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clasNames from 'classnames';
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
      centers: {}
    };
  }
}
EditEvent.propTypes = {

};
function mapStateToProps(state) {

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
