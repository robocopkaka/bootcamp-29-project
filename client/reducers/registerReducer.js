import history from '../history';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.isRegistered, action) {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      history.push('/');
      return !!sessionStorage.registered;
    default:
      return state;
  }
}
