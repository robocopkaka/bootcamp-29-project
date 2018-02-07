import axios from 'axios';

class CenterApi {
  static create(values) {
    return axios.post(
      'http://localhost:8000/api/v2/users',
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
        return err;
      });
  }
}
export default CenterApi;
