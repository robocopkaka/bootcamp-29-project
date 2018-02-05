import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      history.push('/');
      return !!sessionStorage.jwt;
    default:
      return state;
  }
}
