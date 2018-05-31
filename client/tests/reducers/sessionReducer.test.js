import { expect } from 'chai';
import sessionReducer from '../../reducers/sessionReducer';
import initialState from '../../reducers/initialState';
import * as types from '../../actions/actionTypes';

const response = {
  message: 'vv'
};

describe('session reducer', () => {
  describe('default', () => {
    it('should return the default state', () => {
      expect(sessionReducer(initialState.session, {})).to.deep.equal(initialState.session);
    });
  });
  describe('login', () => {
    it('should handle LOGIN_SUCCESS', () => {
      const state = initialState.session;
      state.message = 'vv';
      state.userId = false;
      expect(sessionReducer(initialState.session, {
        type: types.LOGIN_SUCCESS,
        response
      })).to.deep.equal(state);
    });
    it('should handle LOGIN_FAILURE', () => {
      const state = initialState.session;
      state.message = 'vv';
      expect(sessionReducer(initialState.session, {
        type: types.LOGIN_FAILURE,
        response
      })).to.deep.equal(state);
    });
    it('should handle LOGIN_REQUEST', () => {
      const state = initialState.session;
      state.isLoading = true;
      expect(sessionReducer(initialState.session, {
        type: types.LOGIN_REQUEST,
      })).to.deep.equal(state);
    });
  });
  describe('logout', () => {
    it('should handle LOGOUT_SUCCESS', () => {
      const state = initialState.session;
      state.isLoading = false;
      expect(sessionReducer(initialState.session, {
        type: types.LOGOUT_SUCCESS
      })).to.deep.equal(state);
    });
    it('should handle LOGOUT_LOADING', () => {
      const state = initialState.session;
      state.isLoading = true;
      expect(sessionReducer(initialState.session, {
        type: types.LOGOUT_LOADING
      })).to.deep.equal(state);
    });
  });
});
