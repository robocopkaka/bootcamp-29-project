import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import * as actions from '../../actions/sessionActions';
import * as types from '../../actions/actionTypes';
import signup from '../fixtures/signup';
import user from '../fixtures/user';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('register actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch REGISTER_SUCCESS if a user signs up successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: signup,
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST },
      { type: types.REGISTER_SUCCESS, response: signup }
    ];

    const store = mockStore({ session: {} });

    return store.dispatch(actions.registerUser(user)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('should dispatch REGISTER_FAILURE if a user does not sign up successfully', () => {
    const error = {};
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: error,
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST },
      { type: types.REGISTER_FAILURE, response: error }
    ];

    const store = mockStore({ session: {} });

    return store.dispatch(actions.registerUser(user)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
