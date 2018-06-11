import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import * as actions from '../../actions/centerActions';
import * as types from '../../actions/actionTypes';
import centers from '../fixtures/centers';
import center from '../fixtures/center';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('center actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch FETCH_CENTERS_LOADING when centersLoading is called', () => {
    const expectedActions = [
      { type: types.FETCH_CENTERS_LOADING },
    ];

    const store = mockStore({ centers: [] });

    store.dispatch(actions.centersLoading());
    expect(store.getActions()).to.deep.equal(expectedActions);
    // });
  });

  it('creates FETCH_CENTERS_SUCCESS after all centers have been fetched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: centers,
      });
    });

    const expectedActions = [
      { type: types.FETCH_CENTERS_LOADING },
      { type: types.FETCH_CENTERS_SUCCESS, data: centers }
    ];

    const store = mockStore({ centers: [] });

    return store.dispatch(actions.fetchCenters()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('creates ADD_CENTER_SUCCESS after a center has been added', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: center,
      });
    });

    const expectedActions = [
      { type: types.ADD_CENTER_LOADING },
      { type: types.ADD_CENTER_SUCCESS, center }
    ];
    const store = mockStore({ center: {} });

    return store.dispatch(actions.addCenter(center)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('creates ADD_CENTER_FAILURE if a center isn\'t saved successfully', () => {
    const error = {};
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error,
      });
    });

    const expectedActions = [
      { type: types.ADD_CENTER_LOADING },
      { type: types.ADD_CENTER_FAILURE }
    ];
    const store = mockStore({ center: {} });

    return store.dispatch(actions.addCenter(center)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('creates UPDATE_CENTER_SUCCESS after a center has been updated', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: center,
      });
    });

    const expectedActions = [
      { type: types.UPDATE_CENTER_LOADING },
      { type: types.UPDATE_CENTER_SUCCESS, center }
    ];

    const store = mockStore({ center: {} });

    return store.dispatch(actions.updateCenter(center)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('creates UPDATE_CENTER_FAILURE after a center was not updated successfully', () => {
    const error = {};
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error,
      });
    });

    const expectedActions = [
      { type: types.UPDATE_CENTER_LOADING },
      { type: types.UPDATE_CENTER_FAILURE }
    ];

    const store = mockStore({ center: {} });

    return store.dispatch(actions.updateCenter(center)).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
