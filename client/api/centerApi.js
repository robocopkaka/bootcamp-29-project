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
        projector: center.projector
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
        console.log('CATCH = ', err.response);
        return err;
      });
  }
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
      .catch((err) => {
        console.log('CATCH = ', err.response);
        return err;
      });
  }
  // static getOne(centerId) {
  //   return axios.get(
  //     `http://localhost:8000/api/v2/centers/${centerId}`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     }
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log('CATCH = ', error.response);
  //       return error;
  //     });
  // }
}
export default CenterApi;
