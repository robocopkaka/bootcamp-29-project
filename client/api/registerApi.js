import axios from 'axios';

class RegisterApi {
  static register(credentials) {
    return axios.post(
      'http://localhost:8000/api/v2/users',
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
        console.log(err.response);
        throw err.response;
      });
  }
}
export default RegisterApi;
