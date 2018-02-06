import * as types from './actionTypes';
import RegisterApi from '../api/registerApi';

export function registerSuccess() {
  return { type: types.REGISTER_SUCCESS };
}

export function registerUser(credentials) {
  return function (dispatch) {
    return RegisterApi.register(credentials)
      .then((response) => {
        sessionStorage.setItem('registered', true);
        dispatch(registerSuccess());
      })
      .catch((error) => {
        throw (error);
      });
  };
}
