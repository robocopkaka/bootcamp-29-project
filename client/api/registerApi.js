import axios from 'axios';

class RegisterApi {
  static register(credentials) {
    return axios.post(
      `${process.env.API_HOST}/api/v2/users`,
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
