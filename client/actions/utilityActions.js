import * as types from './actionTypes';

export function setComponentNameSuccess(name) {
  return { type: types.SET_COMPONENT_NAME_SUCCESS, name };
}
export function setComponentName(name) {
  return function (dispatch) {
    dispatch(setComponentNameSuccess(name));
  };
}
