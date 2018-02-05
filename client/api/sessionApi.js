import axios from 'axios';

class SessionApi {
  static login(credentials) {
    return axios.post(
      'http://localhost:8000/api/v2/users/login',
      JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
export default SessionApi;
