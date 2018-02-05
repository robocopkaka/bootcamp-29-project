import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';


export function loginSuccess() {
  return { type: types.LOGIN_SUCCESS };
}

export function loginUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials)
      .then((response) => {
        sessionStorage.setItem('jwt', response.data.token);
        dispatch(loginSuccess());
      })
      .catch((error) => {
        throw (error);
      });
  };
}
