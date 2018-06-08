import decode from 'jwt-decode';
import * as types from './actionTypes';
import RegisterApi from '../api/registerApi';

export function registerSuccess(response) {
  return { type: types.REGISTER_SUCCESS, response };
}

export function registerFailure(response) {
  return { type: types.REGISTER_FAILURE, response };
}

export function registerLoading() {
  return { type: types.REGISTER_LOADING };
}

export function registerUser(credentials) {
  return (dispatch) => {
    dispatch(registerLoading());
    return RegisterApi.register(credentials)
      .then((response) => {
        const decodedToken = decode(response.data.token);
        sessionStorage.setItem('registered', true);
        sessionStorage.setItem('jwt', response.data.token);
        sessionStorage.setItem('userId', decodedToken.id);
        dispatch(registerSuccess(response.data));
        return response.data.message;
      })
      .catch((error) => {
        dispatch(registerFailure(error.data));
        throw error.data.message;
      });
  };
}
