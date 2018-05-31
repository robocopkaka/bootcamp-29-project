import decode from 'jwt-decode';
import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';


export function loginSuccess(response) {
  return { type: types.LOGIN_SUCCESS, response };
}
export function loginFailure(response) {
  return { type: types.LOGIN_FAILURE, response };
}
export function loginRequest() {
  return { type: types.LOGIN_REQUEST };
}
export function logoutRequest() {
  return { type: types.LOGOUT_LOADING };
}
export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}

export function loginUser(credentials) {
  return (dispatch) => {
    dispatch(loginRequest());
    return sessionApi.login(credentials)
      .then((response) => {
        const decodedToken = decode(response.data.token);
        sessionStorage.setItem('jwt', response.data.token);
        sessionStorage.setItem('userId', decodedToken.id);
        if (decodedToken.isAdmin) {
          sessionStorage.setItem('isAdmin', decodedToken.isAdmin);
        }
        dispatch(loginSuccess(response.data));
        return response.data.message;
      })
      .catch((error) => {
        dispatch(loginFailure(error.data));
        throw error.data.message;
      });
  };
}

export function logOutUser() {
  return async (dispatch) => {
    try {
      dispatch(logoutRequest());
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('isAdmin');
      dispatch(logoutSuccess());
    } catch (error) {
      // throw error;
    }
  };
}
