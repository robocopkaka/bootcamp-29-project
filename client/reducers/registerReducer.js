import update from 'immutability-helper';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.register, action) {
  let newState = {};
  switch (action.type) {
    case types.REGISTER_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    case types.REGISTER_SUCCESS:
      newState = update(state, {
        isRegistered: { $set: !!sessionStorage.registered },
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
