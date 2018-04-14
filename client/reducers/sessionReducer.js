import update from 'immutability-helper';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default function sessionReducer(state = initialState.session, action) {
  let newState = {};
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      newState = update(state, {
        jwt: { $set: !!sessionStorage.jwt },
        isAdmin: { $set: !!sessionStorage.isAdmin },
        userId: { $set: !!sessionStorage.userId },
        message: { $set: action.response.data.message },
        isLoading: { $set: false }
      });
      return newState;
    case types.LOGIN_FAILURE:
      newState = update(state, {
        message: { $set: action.response.data.message },
        isLoading: { $set: false }
      });
      return newState;
    case types.LOGIN_REQUEST:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    case types.LOGOUT_SUCCESS:

      newState = update(state, {
        jwt: { $set: !!sessionStorage.jwt },
        isAdmin: { $set: !!sessionStorage.isAdmin },
        userId: { $set: !!sessionStorage.userId },
        isLoading: { $set: false }
      });
      return newState;
    case types.LOGOUT_LOADING:
      newState = update(state, {
        isLoading: { $set: false }
      });
      return newState;
    default:
      return state;
  }
}
