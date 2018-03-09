import * as types from './actionTypes';
import RegisterApi from '../api/registerApi';

export function registerSuccess(response) {
  return { type: types.REGISTER_SUCCESS, response };
}

export function registerFailure(response) {
  return { type: types.REGISTER_FAILURE, response };
}

export function registerUser(credentials) {
  return (dispatch) => {
    return RegisterApi.register(credentials)
      .then((response) => {
        sessionStorage.setItem('registered', true);
        dispatch(registerSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(registerFailure(error));
        throw (error);
      });
  };
}
