import axios from 'axios';

class EventApi {
  static getAll() {
    return axios.get(
      'http://localhost:8000/api/v2/events',
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
  static getOne(eventId) {
    return axios.get(
      `http://localhost:8000/api/v2/events/${eventId}`,
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
      });
  }
}
export default EventApi;
