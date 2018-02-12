import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function singleCenterReducer(state = initialState.center, action) {
  switch (action.type) {
    case types.FETCH_SINGLE_CENTER_SUCCESS:
      history.push(`/centers/${action.center.id}`);
      return action.center;
    default:
      return state;
  }
}
