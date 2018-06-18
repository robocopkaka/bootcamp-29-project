import axios from 'axios';

const SESSION_BASE_API = '/api/v2/users';

class SessionApi {
  static login(credentials) {
    return axios.post(
      `${SESSION_BASE_API}/login`,
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
  static register(credentials) {
    return axios.post(
      `${SESSION_BASE_API}`,
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err.response;
      });
  }
}
export default SessionApi;
