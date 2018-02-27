import * as types from './actionTypes';

export default function setConponentName(name) {
  return { type: types.SET_COMPONENT_NAME_SUCCESS, name };
}
