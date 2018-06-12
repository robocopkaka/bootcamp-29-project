import update from 'immutability-helper';
import decode from 'jwt-decode';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default function sessionReducer(state = initialState.session, action) {
  let newState = {};
  let decodedToken = {};
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      decodedToken = decode(action.response.token)
      newState = update(state, {
        jwt: { $set: !!sessionStorage.jwt },
        isAdmin: { $set: !!sessionStorage.isAdmin },
        name: { $set: decodedToken.name },
        userId: { $set: !!sessionStorage.userId },
        message: { $set: action.response.message },
        isLoading: { $set: false }
      });
      return newState;
    case types.LOGIN_FAILURE:
      newState = update(state, {
        message: { $set: action.response.message },
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
        name: { $set: '' },
        userId: { $set: !!sessionStorage.userId },
        isLoading: { $set: false }
      });
      return newState;
    case types.LOGOUT_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;

    case types.REGISTER_SUCCESS:
      newState = update(state, {
        jwt: { $set: !!sessionStorage.jwt },
        isAdmin: { $set: !!sessionStorage.isAdmin },
        name: { $set: action.response.user.name },
        userId: { $set: !!sessionStorage.userId },
        message: { $set: action.response.message },
        isLoading: { $set: false }
      });
      return newState;
    case types.REGISTER_FAILURE:
      newState = update(state, {
        message: { $set: action.response.message },
        isLoading: { $set: false }
      });
      return newState;
    default:
      return state;
  }
}
