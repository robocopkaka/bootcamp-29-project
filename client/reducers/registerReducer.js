import history from '../history';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.isRegistered, action) {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      history.push('/');
      return true;
    default:
      return state;
  }
}
