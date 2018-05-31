import * as types from './actionTypes';
import SingleCenterApi from '../api/singleCenterApi';

export function fetchSingleCenterSuccess(center) {
  return { type: types.FETCH_SINGLE_CENTER_SUCCESS, center };
}
export function fetchSingleCenter(centerId) {
  return (dispatch) => {
    return SingleCenterApi.getOne(centerId)
      .then((response) => {
        dispatch(fetchSingleCenterSuccess(response.data));
      });
    // .catch(() => {
    //   // console.log(error);
    // });
  };
}
