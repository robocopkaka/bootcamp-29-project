import update from 'immutability-helper';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

// function addCenterReducer(state = [], action) {
//   let newState = {};
//   switch (action.type) {
//     case types.ADD_CENTER_SUCCESS:
//       newState = update(state, {
//         $set: [
//           ...state.filter(center => center.id !== action.center.center.id),
//           Object.assign({}, action.center.center)
//         ]
//       });
//       return newState;
//     default:
//       return state;
//   }
// }

export default function centerReducer(state = initialState.centers, action) {
  let newState = {};
  let index;
  switch (action.type) {
    case types.ADD_CENTER_SUCCESS:
      newState = update(state, {
        centers: {
          $set: [
            ...state.centers.filter(center => center.id !== action.center.center.id),
            Object.assign({}, action.center.center)
          ]
        },
        isLoading: { $set: false },
        message: { $set: action.center.message }
      });
      return newState;
    case types.ADD_CENTER_FAILURE:
      console.log(action)
      newState = update(state, {
        isLoading: { $set: false },
        // message: { $set: action.center.data.message }
      });
      return newState;
    case types.ADD_CENTER_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    case types.FETCH_CENTERS_SUCCESS:
      newState = update(state, {
        centers: {
          $set: action.data.data.centers
        },
        meta: {
          pagination: {
            limit: {
              $set: action.data.meta.pagination.limit
            },
            page: { $set: action.data.meta.pagination.page },
            pages: { $set: action.data.meta.pagination.pages },
            total: { $set: action.data.meta.pagination.total }
          }
        },
        isLoading: {
          $set: false
        }
      });
      return newState;
    // case types.FETCH_CENTERS_FAILURE:
    //   newState = update(state, {
    //     isLoading: { $set: false }
    //   });
    //   return newState;
    case types.FETCH_CENTERS_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    case types.FETCH_SINGLE_CENTER_SUCCESS:
      newState = update(state, {
        center: {
          $set: action.center.center
        }
      });
      return newState;
    case types.UPDATE_CENTER_SUCCESS:
      index = state.centers.findIndex(val => val.id === action.center.center.id);
      newState = update(state, {
        centers: {
          // $set: [
          //   ...state.centers.filter(center => center.id !== action.center.center.id),
          //   Object.assign({}, action.center.center)
          // ]
          [index]: { $set: action.center.center }
        },
        isLoading: { $set: false },
        message: { $set: action.center.message }
      });
      return newState;
    case types.UPDATE_CENTER_FAILURE:
      newState = update(state, {
        isLoading: { $set: false },
        message: { $set: action.center.data.message }
      });
      return newState;
    case types.UPDATE_CENTER_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    default:
      return state;
  }
}
