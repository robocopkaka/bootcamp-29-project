import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      history.push('/');
      return (Object.assign(
        {},
        state,
        { jwt: !!sessionStorage.jwt },
        { isAdmin: !!sessionStorage.isAdmin },
        { userId: !!sessionStorage.userId },
        { message: action.response.data.message },
        { isLoading: false }
      ));
    case types.LOGIN_FAILURE:
      history.push('/login');
      return (Object.assign(
        {},
        state,
        { message: action.response.data.message },
        { isLoading: false }
      ));
    case types.LOGIN_REQUEST:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    case types.LOGOUT_SUCCESS:
      history.push('/');
      return (Object.assign(
        {},
        state,
        { jwt: !!sessionStorage.jwt },
        { isAdmin: !!sessionStorage.isAdmin },
        { userId: !!sessionStorage.userId },
        { isLoading: false }
      ));
    case types.LOGOUT_LOADING:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    default:
      return state;
  }
}
