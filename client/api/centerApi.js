import axios from 'axios';

class CenterApi {
  static create(center) {
    return axios.post(
      'http://localhost:8000/api/v2/centers',
      JSON.stringify({
        name: center.name,
        address: center.address,
        capacity: center.capacity,
        state: center.state,
        detail: center.detail,
        chairs: center.chairs,
        projector: center.projector,
        image: center.image
      }),
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
        // console.log('CATCH = ', err.response);
        throw err.response;
      });
  }
  static getAll(page) {
    return axios.get(
      `http://localhost:8000/api/v2/centers?page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log('CATCH = ', err.response);
        return err.response;
      });
  }
  static update(center) {
    return axios.put(
      `http://localhost:8000/api/v2/centers/${parseInt(center.id, 10)}`,
      JSON.stringify({
        name: center.name,
        address: center.address,
        capacity: center.capacity,
        state: center.state,
        detail: center.detail,
        chairs: center.chairs,
        projector: center.projector,
        image: center.image
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${sessionStorage.jwt}`
        }
      },
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log('CATCH = ', error.response);
        throw error.response;
      });
  }

  static getEventsInCenter(centerId, page) {
    return axios.get(
      `http://localhost:8000/api/v2/centers/${centerId}/events?page=${page}&limit=${6}`,
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
        return error;
      });
  }
}
export default CenterApi;
