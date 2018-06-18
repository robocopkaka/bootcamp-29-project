import * as types from './actionTypes';

export function setComponentNameSuccess(name) {
  return { type: types.SET_COMPONENT_NAME_SUCCESS, name };
}
export function setComponentName(name) {
  return async (dispatch) => {
    try {
      if (name === undefined || name === null) {
        dispatch(setComponentNameSuccess(''));
      } else {
        dispatch(setComponentNameSuccess(name));
      }
    } catch (error) {
      //
    }
  };
}
