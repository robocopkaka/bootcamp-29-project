import { expect } from 'chai';
import centerReducer from '../../reducers/centerReducer';
import initialState from '../../reducers/initialState';
import * as types from '../../actions/actionTypes';
import centersInitialState from '../fixtures/centersInitialState';
import * as newCenter from '../fixtures/center';
import centers from '../fixtures/centers';

const center = {
  center: newCenter.default,
  data: {
    message: ''
  },
  message: ''
};

const data = {
  data: {
    centers
  },
  meta: {
    pagination: {
      pages: 1,
      page: 1,
      limit: 1,
      offset: '',
      total: 1
    }
  }
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(centerReducer(initialState.centers, {})).to.deep.equal(initialState.centers);
  });

  describe('add center reducers', () => {
    it('should add a center to the centers array in state', () => {
      const state = initialState.centers;
      state.centers.push(newCenter.default);
      expect(centerReducer(initialState.centers, {
        type: types.ADD_CENTER_SUCCESS,
        center
      })).to.deep.equal(state);
    });
    it('should handle errors when an error happens when trying to add a center', () => {
      const state = initialState.centers;
      expect(centerReducer(state, {
        type: types.ADD_CENTER_FAILURE,
        center
      })).to.deep.equal(initialState.centers);
    });
    it('should handle loading while a center is being added', () => {
      const state = initialState.centers;
      state.isLoading = true;
      expect(centerReducer(initialState.centers, {
        type: types.ADD_CENTER_LOADING,
      })).to.deep.equal(state);
    });
    it('return the default state if no action is passed', () => {
      const state = initialState.centers;
      expect(centerReducer(state, {})).to.deep.equal(state);
    });
  });
  describe('fetch centers reducer', () => {
    it('should add centers fetched from the database to state', () => {
      const state = initialState.centers;
      state.isLoading = false;
      state.centers.push(centers[1]);
      state.meta.pagination.pages = 1;
      state.meta.pagination.page = 1;
      state.meta.pagination.limit = 1;
      state.meta.pagination.total = 1;
      expect(centerReducer(initialState.centers, {
        type: types.FETCH_CENTERS_SUCCESS,
        data
      })).to.deep.equal(state);
    });
    it('should handle FETCH_CENTERS_LOADING', () => {
      const state = initialState.centers;
      state.isLoading = true;
      expect(centerReducer(initialState.centers, {
        type: types.FETCH_CENTERS_LOADING,
      })).to.deep.equal(state);
    });
  });
  describe('fetch single reducer', () => {
    it('should handle FETCH_SINGLE_CENTER_SUCCESS', () => {
      const state = initialState.centers;
      state.isLoading = false;
      state.center = newCenter.default;
      expect(centerReducer(initialState.centers, {
        type: types.FETCH_SINGLE_CENTER_SUCCESS,
        center
      })).to.deep.equal(state);
    });
  });
  describe('update centers', () => {
    it('should handle UPDATE_CENTER_SUCCESS', () => {
      const state = initialState.centers;
      expect(centerReducer(initialState.centers, {
        type: types.UPDATE_CENTER_SUCCESS,
        center
      })).to.deep.equal(state);
    });
    it('should handle UPDATE_CENTER_FAILURE', () => {
      const state = initialState.centers;
      expect(centerReducer(initialState.centers, {
        type: types.UPDATE_CENTER_FAILURE,
        center
      })).to.deep.equal(state);
    });
    it('should handle UPDATE_CENTER_LOADING', () => {
      const state = initialState.centers;
      state.isLoading = true;
      expect(centerReducer(initialState.centers, {
        type: types.UPDATE_CENTER_LOADING,
        center
      })).to.deep.equal(state);
    });
  });
});
