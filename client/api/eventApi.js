import axios from 'axios';

class EventApi {
  static getAll() {
    return axios.get(
      'http://localhost:8000/api/v2/centers',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log('CATCH = ', error.response);
        return error;
      })
  }
}
export default EventApi;
