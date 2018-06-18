import { expect } from 'chai';
import sessionReducer from '../../reducers/sessionReducer';
import initialState from '../../reducers/initialState';
import * as types from '../../actions/actionTypes';

const response = {
  message: 'vv',
  user: {
    name: 'kachi'
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhaGFzQGdtYWlsLmNvbSIsIm5hbWUiOiJrYWNoaSIsImlkIjozLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTI4ODAwMzY1LCJleHAiOjE1Mjg4ODY3NjV9.a0UUdgIbrU-wDnO3HzGjhfy-jAM-CwgkHHzHqrfWT1k'
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
      state.name = 'kachi';
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
      state.name = '';
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

describe('register reducers', () => {
  describe('default state', () => {
    it('should return the default state', () => {
      const state = initialState.session;
      expect(sessionReducer(initialState.session, {})).to.deep.equal(state);
    });
  });
  describe('register', () => {
    it('should handle REGISTER_SUCCESS', () => {
      const state = initialState.session;
      state.message = 'vv';
      state.userId = false;
      state.isLoading = false;
      state.name = 'kachi';
      expect(sessionReducer(initialState.session, {
        type: types.REGISTER_SUCCESS,
        response
      })).to.deep.equal(state);
    });
    it('should handle REGISTER_FAILURE', () => {
      const state = initialState.session;
      state.message = 'vv';
      expect(sessionReducer(initialState.session, {
        type: types.REGISTER_FAILURE,
        response
      })).to.deep.equal(state);
    });
    it('should handle REGISTER_LOADING', () => {
      const state = initialState.session;
      state.isLoading = true;
      expect(sessionReducer(initialState.session, {
        type: types.REGISTER_LOADING
      })).to.deep.equal(state);
    });
  });
});
