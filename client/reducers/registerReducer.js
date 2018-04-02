import history from '../history';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.register, action) {
  switch (action.type) {
    case types.REGISTER_LOADING:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    case types.REGISTER_SUCCESS:
      return (Object.assign(
        {},
        state,
        !!sessionStorage.registered,
        { message: action.response.data.message },
        { isLoading: false }
      ));
    case types.REGISTER_FAILURE:
      return (Object.assign(
        {},
        state,
        { message: action.response.data.message },
        { isLoading: false }
      ));
    default:
      return state;
  }
}
