import * as types from './actionTypes';

export function setComponentNameSuccess(name) {
  return { type: types.SET_COMPONENT_NAME_SUCCESS, name };
}
export function setComponentName(name) {
  return function (dispatch) {
    if (name === undefined || name === null) {
      dispatch(setComponentNameSuccess(''));
    }
    dispatch(setComponentNameSuccess(name));
  };
}
