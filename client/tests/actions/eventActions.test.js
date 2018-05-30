import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import * as actions from '../../actions/eventActions';
import * as types from '../../actions/actionTypes';
import events from '../fixtures/events';
import event from '../fixtures/event';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Event actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('add event actions', () => {
    it('should dispatch ADD_EVENT_SUCCESS if an event was created successfully', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: event,
        });
      });

      const expectedActions = [
        { type: types.ADD_EVENT_LOADING },
        { type: types.ADD_EVENT_SUCCESS, event }
      ];

      const store = mockStore({ event: {} });

      return store.dispatch(actions.addEvent(event)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
    it('should dispatch ADD_EVENT_FAILURE if an event was not created successfully', () => {
      const error = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
          response: error,
        });
      });

      const expectedActions = [
        { type: types.ADD_EVENT_LOADING },
        { type: types.ADD_EVENT_FAILURE }
      ];

      const store = mockStore({});

      return store.dispatch(actions.addEvent(event)).catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });
  describe('update event actions', () => {
    it('should dispatch UPDATE_EVENT_SUCCESS if an event was created successfully', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: event,
        });
      });

      const expectedActions = [
        { type: types.UPDATE_EVENT_LOADING },
        { type: types.UPDATE_EVENT_SUCCESS, event }
      ];

      const store = mockStore({ event: {} });

      return store.dispatch(actions.updateEvent(event)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
    it('should dispatch UPDATE_EVENT_FAILURE if an event was not created successfully', () => {
      const error = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
          response: error,
        });
      });

      const expectedActions = [
        { type: types.UPDATE_EVENT_LOADING },
        { type: types.UPDATE_EVENT_FAILURE, event: {} }
      ];

      const store = mockStore({ events: {} });

      return store.dispatch(actions.updateEvent(event)).catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });
  describe('fetch events actions', () => {
    it('should dispatch FETCH_EVENTS_SUCCESS if events were fetched successfully', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: events,
        });
      });

      const expectedActions = [
        { type: types.FETCH_EVENTS_LOADING },
        { type: types.FETCH_EVENTS_SUCCESS, data: events }
      ];

      const store = mockStore({ events: [] });

      return store.dispatch(actions.fetchEvents()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });
  describe('fetch single event actions', () => {
    it('should dispatch FETCH_SINGLE_EVENT_SUCCESS if an event was fetched successfully', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: event,
        });
      });

      const expectedActions = [
        { type: types.FETCH_SINGLE_EVENT_SUCCESS, event }
      ];

      const store = mockStore({ event: {} });
      const eventId = 1;

      return store.dispatch(actions.fetchSingleEvent(10)).then(() => {
        console.log(store.getActions())
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });
  });
});
