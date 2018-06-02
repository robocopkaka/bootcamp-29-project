import axios from 'axios';

const REGISTER_BASE_API = '/api/v2/users';

class RegisterApi {
  static register(credentials) {
    return axios.post(
      `${REGISTER_BASE_API}`,
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
export default RegisterApi;
