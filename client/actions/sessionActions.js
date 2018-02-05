import sessionApi from '../api/sessionApi';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function loginUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials)
      .then((response) => {
        sessionStorage.setItem('jwt', response.data.token);
        dispatch(loginSuccess());
      })
      .catch((error) => {
        throw(error);
      });
  };
}
