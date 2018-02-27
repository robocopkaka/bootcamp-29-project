import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function utilityReducer(state = initialState.componentName, action) {
  switch (action.type) {
    case types.SET_COMPONENT_NAME_SUCCESS:
      return action.name;
    default:
      return state;
  }
}
