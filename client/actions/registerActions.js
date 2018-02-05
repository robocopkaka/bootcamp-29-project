import * as types from './actionTypes';
import registerApi from '../api/registerApi';

export function registerSuccess() {
  return { type: types.registerApi };
}

export function registerUser(credentials) {
  return function(dispatch) {
    return registerApi.register(credentials)
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        throw (error);
      });
  };
}
