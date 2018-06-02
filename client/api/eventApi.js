import axios from 'axios';

const EVENTS_BASE_API = '/api/v2/events';

class EventApi {
  static getAll(page) {
    return axios.get(
      `${EVENTS_BASE_API}?page=${page}`,
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
      `${EVENTS_BASE_API}/${eventId}`,
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
      `${EVENTS_BASE_API}`,
      JSON.stringify({
        name: eventObject.name,
        detail: eventObject.detail,
        date: eventObject.date,
        guests: eventObject.guests,
        centerId: parseInt(eventObject.centerId, 10),
        categoryId: parseInt(eventObject.categoryId, 10)
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
      `${EVENTS_BASE_API}/${eventObject.id}`,
      JSON.stringify({
        name: eventObject.name,
        detail: eventObject.detail,
        date: eventObject.date,
        guests: eventObject.guests,
        centerId: parseInt(eventObject.centerId, 10),
        categoryId: parseInt(eventObject.categoryId, 10)
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
      `${EVENTS_BASE_API}/${eventId}`,
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
