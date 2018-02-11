import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function centerReducer(state = initialState.centers, action) {
  switch (action.type) {
    case types.ADD_CENTER_SUCCESS:
      history.push('/add-center');
      return [
        ...state.filter(center => center.id !== action.center.id),
        Object.assign({}, action.center)
      ];
    case types.FETCH_CENTERS_SUCCESS:
      return action.centers;
    // case types.FETCH_SINGLE_CENTER_SUCCESS:
    //   history.push(`/centers/${action.center.id}`);
    //   return action.center;
    default:
      return state;
  }
}
