import axios from 'axios';

class CenterApi {
  static create(values) {
    return axios.post(
      'http://localhost:8000/api/v2/centers',
      JSON.stringify({ values }),
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${sessionStorage.jwt}`
        }
      }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('CATCH = ', err.response);
        return err;
      });
  }
}
export default CenterApi;
