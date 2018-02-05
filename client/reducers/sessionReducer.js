import initialState from './initialState';
import history from '../history';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      history.push('/');
      return !!sessionStorage.jwt;
    default:
      return state;
  }
}
