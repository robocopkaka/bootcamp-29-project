import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedHome, { Home } from '../components/Home';
import Preloader from '../components/common/Preloader';
import centers from './fixtures/centers';
import events from './fixtures/events';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  let wrapper, loadingEventsWrapper, loadingCentersWrapper;
  const centersLoading = false;
  const eventsLoading = false;
  const loggedIn = false;
  const loading = true;

  const initialState = {
    centers: {
      centers,
      isLoading: false
    },
    events: {
      events,
      isLoading: false
    },
    session: {
      loggedIn: false
    }
  };
  const mockStore = configureStore();
  let store, container;
  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedHome store={store} />);
    wrapper = shallow(<Home
      centers={centers}
      events={events}
      centersLoading={centersLoading}
      eventActions={eventsLoading}
      loggedIn={loggedIn}
    />);
    loadingCentersWrapper = shallow(<Home
      centers={centers}
      events={events}
      centersLoading={loading}
      eventActions={eventsLoading}
      loggedIn={loggedIn}
    />);
    loadingEventsWrapper = shallow(<Home
      centers={centers}
      events={events}
      eventsLoading={loading}
      eventActions={eventsLoading}
      loggedIn={loggedIn}
    />);
  });
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the container as in initialState', () => {
    expect(container.prop('centers')).toEqual(initialState.centers.centers);
    expect(container.prop('events')).toEqual(initialState.events.events);
    expect(container.prop('centersLoading')).toEqual(initialState.centers.isLoading);
    expect(container.prop('eventsLoading')).toEqual(initialState.events.isLoading);
    expect(container.prop('loggedIn')).toEqual(initialState.session.loggedIn);
  });

  it('should have a Preloader if centersLoading is true', () => {
    expect(loadingCentersWrapper.find(Preloader).length).toBe(1);
  });
  it('should have a Preloader if eventsLoading is true', () => {
    expect(loadingEventsWrapper.find(Preloader).length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call componentDidMount', () => {
      const admin = true;
      const emptyEvents = [];
      const emptyCenters = [];
      const dispatchActions = {
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const newLocation = { search: '' };
      const spy = jest.spyOn(Home.prototype, 'componentDidMount');
      const mountedWrapper = mount(
        <Provider store={store}>
          <Home
            centers={emptyCenters}
            events={emptyEvents}
            centersLoading={centersLoading}
            actions={dispatchActions}
            loggedIn={admin}
          />
        </Provider>);
      expect(Home.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    });
  });
});
