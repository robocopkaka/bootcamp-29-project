import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function centerReducer(state = initialState.centers, action) {
  switch (action.type) {
    case types.ADD_CENTER_SUCCESS:
      history.push('/centers');
      console.log(action);
      return (Object.assign(
        {},
        state,
        {
          centers: [
            ...state.centers.filter(center => center.id !== action.center.center.id),
            Object.assign({}, action.center.center)
          ]
        },
        { isLoading: false },
        { message: action.center.message }
      ));
    case types.ADD_CENTER_FAILURE:
      console.log(`reducer response = ${JSON.parse(action)}`);
      history.push('/add-center');
      return (Object.assign(
        {},
        state,
        { isLoading: false },
        // { message: action.response.data.message }
      ));
    case types.ADD_CENTER_LOADING:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    case types.FETCH_CENTERS_SUCCESS:
      // return action.centers;
      return (Object.assign(
        {},
        state,
        { centers: action.centers }
      ));
    case types.UPDATE_CENTER_SUCCESS:
      history.push(`/centers/${action.center.id}`);
      return [
        ...state.filter(center => center.id !== action.center.id),
        Object.assign({}, action.center)
      ];
    default:
      return state;
  }
}
