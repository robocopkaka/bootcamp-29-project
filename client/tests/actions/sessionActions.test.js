import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import * as actions from '../../actions/sessionActions';
import * as types from '../../actions/actionTypes';
import loginResponse from '../fixtures/loginResponse';
import login from '../fixtures/login';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('session actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch LOGIN_SUCCESS when a user logs in successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: loginResponse,
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST },
      { type: types.LOGIN_SUCCESS, response: loginResponse }
    ];

    const store = mockStore({ session: {} });

    return store.dispatch(actions.loginUser(login)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('should dispatch LOGIN_FAILURE when a user does not log in successfully', () => {
    const error = {};
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: error
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST },
      { type: types.LOGIN_FAILURE, response: error }
    ];

    const store = mockStore({ session: {} });

    return store.dispatch(actions.loginUser(login)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('should dispatch LOGOUT_SUCCESS when a user logs out successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: loginResponse,
      });
    });

    const expectedActions = [
      { type: types.LOGOUT_LOADING },
      { type: types.LOGOUT_SUCCESS }
    ];

    const store = mockStore({ session: {} });

    return store.dispatch(actions.logOutUser()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
