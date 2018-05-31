import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import * as actions from '../../actions/singleCenterActions';
import * as types from '../../actions/actionTypes';
import center from '../fixtures/center';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('single center actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch FETCH_SINGLE_CENTER_SUCCESS if a center is fetched successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: center,
      });
    });

    const expectedActions = [
      { type: types.FETCH_SINGLE_CENTER_SUCCESS, center }
    ];

    const store = mockStore({ center: {} });

    return store.dispatch(actions.fetchSingleCenter(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
