import axios from 'axios';

class RegisterApi {
  static register(credentials) {
    return axios.post(
      'http://localhost:8000/api/v2/users',
      JSON.stringify({
        name: `${credentials.firstName} ${credentials.lastName}`,
        email: credentials.email,
        password: credentials.password
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(() => {
        console.log(`Your account was created successfully, ${credentials.firstName}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default RegisterApi;
