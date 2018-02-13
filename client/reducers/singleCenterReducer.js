import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function singleCenterReducer(state = initialState.center, action) {
  switch (action.type) {
    case types.FETCH_SINGLE_CENTER_SUCCESS:
      return action.center;
    default:
      return state;
  }
}
