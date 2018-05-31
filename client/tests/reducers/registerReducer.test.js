import { expect } from 'chai';
import registerReducer from '../../reducers/registerReducer';
import initialState from '../../reducers/initialState';
import * as types from '../../actions/actionTypes';

const response = {
  message: 'vv'
};

describe('register reducer', () => {
  describe('default state', () => {
    it('should return the default state', () => {
      const state = initialState.register;
      expect(registerReducer(initialState.register, {})).to.deep.equal(state);
    });
  });
  describe('register', () => {
    it('should handle REGISTER_SUCCESS', () => {
      const state = initialState.register;
      state.message = 'vv';
      expect(registerReducer(initialState.register, {
        type: types.REGISTER_SUCCESS,
        response
      })).to.deep.equal(state);
    });
    it('should handle REGISTER_FAILURE', () => {
      const state = initialState.register;
      state.message = 'vv';
      expect(registerReducer(initialState.register, {
        type: types.REGISTER_FAILURE,
        response
      })).to.deep.equal(state);
    });
    it('should handle REGISTER_LOADING', () => {
      const state = initialState.register;
      state.isLoading = true;
      expect(registerReducer(initialState.register, {
        type: types.REGISTER_LOADING
      })).to.deep.equal(state);
    });
  });
});
