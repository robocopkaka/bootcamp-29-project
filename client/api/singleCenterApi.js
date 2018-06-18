import axios from 'axios';

const CENTER_BASE_API = '/api/v2/centers';

class SingleCenterApi {
  static getOne(centerId) {
    return axios.get(
      `${CENTER_BASE_API}/${centerId}`,
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
    //   console.log('CATCH = ', error.response);
    //   return error;
    // });
  }
}
export default SingleCenterApi;
