import decode from 'jwt-decode';
import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';


export function loginSuccess() {
  return { type: types.LOGIN_SUCCESS };
}

export function loginUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials)
      .then((response) => {
        const decodedToken = decode(response.data.token);
        sessionStorage.setItem('jwt', response.data.token);
        sessionStorage.setItem('userId', decodedToken.id);
        if (decodedToken.isAdmin) {
          sessionStorage.setItem('isAdmin', decodedToken.isAdmin);
        }
        dispatch(loginSuccess());
      })
      .catch((error) => {
        throw (error);
      });
  };
}

export function logOutUser() {
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('isAdmin');
  return { type: types.LOGOUT_SUCCESS };
}
