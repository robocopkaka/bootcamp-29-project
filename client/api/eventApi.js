import axios from 'axios';

class EventApi {
  static getAll(page) {
    return axios.get(
      `http://localhost:8000/api/v2/events?page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then((response) => {
        return response;
      });
    // .catch((error) => {
    //   console.log('CATCH = ', error);
    //   return error.response;
    // })
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
      });
    // .catch((error) => {
    //   // console.log('CATCH = ', error.response);
    //   return error;
    // });
  }
  static create(eventObject) {
    return axios.post(
      'http://localhost:8000/api/v2/events/',
      JSON.stringify({
        name: eventObject.name,
        detail: eventObject.detail,
        date: eventObject.date,
        guests: eventObject.guests,
        centerId: eventObject.centerId,
        categoryId: eventObject.categoryId
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${sessionStorage.jwt}`
        }
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // console.log('CATCH = ', error.response);
        throw error.response;
      });
  }
  static update(eventObject) {
    return axios.put(
      `http://localhost:8000/api/v2/events/${eventObject.id}`,
      JSON.stringify({
        name: eventObject.name,
        detail: eventObject.detail,
        date: eventObject.date,
        guests: eventObject.guests,
        centerId: eventObject.centerId,
        categoryId: eventObject.categoryId
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${sessionStorage.jwt}`
        }
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // console.log('CATCH = ', error.response);
        throw error.response;
      });
  }
  static deleteEvent(eventId) {
    return axios.delete(
      `http://localhost:8000/api/v2/events/${eventId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${sessionStorage.jwt}`
        }
      }
    )
      .then(() => {
        return eventId;
      });
    // .catch((error) => {
    //   console.log('CATCH = ', error.response);
    //   return error;
    // });
  }
}
export default EventApi;
