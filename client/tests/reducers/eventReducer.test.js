import { expect } from 'chai';
import eventReducer from '../../reducers/eventReducer';
import initialState from '../../reducers/initialState';
import * as types from '../../actions/actionTypes';
import * as newEvent from '../fixtures/event';
import events from '../fixtures/events';

const event = {
  event: newEvent.default,
  message: '',
  data: {
    message: ''
  }
};
const eventId = 3;

const data = {
  data: {
    events
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

describe('event reducers', () => {
  describe('default', () => {
    it('should handle a default case', () => {
      const state = initialState.events;
      expect(eventReducer(state, {})).to.deep.equal(state);
    });
  });
  describe('add event', () => {
    it('should handle ADD_EVENT_SUCCESS', () => {
      const state = initialState.events;
      state.events.push(newEvent.default);
      expect(eventReducer(initialState.events, {
        type: types.ADD_EVENT_SUCCESS,
        event
      })).to.deep.equal(state);
    });
    it('should handle ADD_EVENT_FAILURE', () => {
      const state = initialState.events;
      state.isLoading = false;
      expect(eventReducer(initialState.events, {
        type: types.ADD_EVENT_FAILURE,
      })).to.deep.equal(state);
    });
    it('should handle ADD_EVENT_LOADING', () => {
      const state = initialState.events;
      state.isLoading = true;
      expect(eventReducer(initialState.events, {
        type: types.ADD_EVENT_LOADING,
      })).to.deep.equal(state);
    });
  });
  describe('fetch events', () => {
    it('should handle FETCH_EVENTS_SUCCESS', () => {
      const state = initialState.events;
      state.isLoading = false;
      state.events.push(events[1]);
      state.events.push(events[2]);
      state.meta.pagination.pages = 1;
      state.meta.pagination.page = 1;
      state.meta.pagination.limit = 1;
      state.meta.pagination.total = 1;
      expect(eventReducer(initialState.events, {
        type: types.FETCH_EVENTS_SUCCESS,
        data
      })).to.deep.equal(state);
    });
    it('should handle FETCH_EVENTS_LOADING', () => {
      const state = initialState.events;
      state.isLoading = true;
      expect(eventReducer(initialState.events, {
        type: types.FETCH_EVENTS_LOADING
      })).to.deep.equal(state);
    });
  });
  describe('fetch single event', () => {
    it('should handle FETCH_SINGLE_EVENT_SUCCESS', () => {
      const state = initialState.events;
      state.isLoading = false;
      state.event = newEvent.default;
      expect(eventReducer(initialState.events, {
        type: types.FETCH_SINGLE_EVENT_SUCCESS,
        event
      }));
    });
  });
  describe('delete event', () => {
    it('should handle DELETE_EVENT_SUCCESS', () => {
      const state = initialState.events;
      state.events.pop();
      expect(eventReducer(initialState.events, {
        type: types.DELETE_EVENT_SUCCESS,
        eventId
      })).to.deep.equal(state);
    });
  });
  describe('update event', () => {
    it('should handle UPDATE_EVENT_SUCCESS', () => {
      const state = initialState.events;
      expect(eventReducer(initialState.events, {
        type: types.UPDATE_EVENT_SUCCESS,
        event
      })).to.deep.equal(state);
    });
    it('should handle UPDATE_EVENT_FAILURE', () => {
      const state = initialState.events;
      expect(eventReducer(initialState.events, {
        type: types.UPDATE_EVENT_FAILURE,
        event
      })).to.deep.equal(state);
    });
  });
});
