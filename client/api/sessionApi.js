import axios from 'axios';

class SessionApi {
  static login(credentials) {
    return axios.post(
      `${process.env.API_HOST}/api/v2/users/login`,
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
        throw err.response;
      });
  }
}
export default SessionApi;
