import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedEvents, { Events } from '../../components/events/container/Events';
import events from '../fixtures/events';
import history from '../../history';
import Preloader from '../../components/common/Preloader';

configure({ adapter: new Adapter() });

describe('<Events />', () => {
  let wrapper, noEventsWrapper;
  const isAdmin = false;
  const isLoading = false;
  const message = '';
  const actions = {
    fetchEvents: () => {}
  };
  const location = {
    search: '?page=2'
  };
  let store, container;
  const mockStore = configureStore();
  const initialState = {
    events: {
      events,
      message: '',
      isLoading: false,
      meta: {
        pagination: {
          pages: 1
        }
      }
    },
    session: {
      isAdmin: false
    }
  };
  beforeEach(() => {
    wrapper = shallow(<Events
      events={events}
      isAdmin={isAdmin}
      isLoading={isLoading}
      message={message}
      actions={actions}
      location={location}
    />);
    noEventsWrapper = shallow(<Events
      events={[]}
      isAdmin={isAdmin}
      isLoading={isLoading}
      message={message}
      actions={actions}
      location={location}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedEvents store={store} />);
  });
  it('should have a parent div with a .container class', () => {
    expect(wrapper.find('.container').length).toBe(1);
  });
  // it('should have a fixed action button if there are events passed as props', () => {
  //   expect(wrapper.find('.fixed-action-btn').length).toBe(1);
  // });
  it('should notify the user that there no events if the events array is empty', () => {
    const text = noEventsWrapper.find('p').text();
    expect(text).toEqual('No events found yet');
  });
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the container match those in state', () => {
    expect(container.prop('events')).toEqual(initialState.events.events);
    expect(container.prop('message')).toEqual(initialState.events.message);
    expect(container.prop('isLoading')).toEqual(initialState.events.isLoading);
    expect(container.prop('pages')).toEqual(initialState.events.meta.pagination.pages);
    expect(container.prop('isAdmin')).toEqual(initialState.session.isAdmin);
  });

  describe('check for Preloader', () => {
    it('should render a Preloader if isLoading is true', () => {
      const loading = true;
      const loadingWrapper = shallow(<Events
        events={events}
        isAdmin={isAdmin}
        isLoading={loading}
        message={message}
        actions={actions}
        location={location}
      />);
      expect(loadingWrapper.find(Preloader).length).toBe(1);
    });
  });

  describe('method interactions', () => {
    // it('should handle deleteEvent', () => {
    //   const spy = jest.spyOn(Events.prototype, 'deleteEvent');
    //   const dispatchActions = {
    //     deleteEvent: jest.fn().mockImplementation(() => Promise.resolve())
    //   };
    //   const admin = true;
    //   const wrapperWithSpy = mount(
    //     <Provider store={store}>
    //       <Events
    //         events={events}
    //         isAdmin={admin}
    //         isLoading={isLoading}
    //         message={message}
    //         actions={dispatchActions}
    //         location={location}
    //         pages={3}
    //       />
    //     </Provider>);
    //   wrapperWithSpy.find('.card-action').first().children().at(1).simulate('click');
    //   expect(Events.prototype.deleteEvent).toHaveBeenCalledTimes(1);
    //   // console.log(wrapperWithSpy.debug());
    // });
    it('should handle changePage', () => {
      const spy = jest.spyOn(Events.prototype, 'changePage');
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const admin = true;
      history.push = jest.fn();
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <Events
            events={events}
            isAdmin={admin}
            isLoading={isLoading}
            message={message}
            actions={dispatchActions}
            location={location}
            pages={9}
          />
        </Provider>);
      wrapperWithSpy.find('li').last().simulate('click');
      expect(Events.prototype.changePage).toHaveBeenCalledTimes(1);
      // console.log(wrapperWithSpy.debug());
    });
  });

  describe('componentDidMount', () => {
    it('calls componentDidMount when a page is passed', () => {
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const spy = jest.spyOn(Events.prototype, 'componentDidMount');
      const mountedWrapper = mount(
        <Provider store={store}>
          <Events
            events={events}
            isAdmin={isAdmin}
            isLoading={isLoading}
            message={message}
            actions={dispatchActions}
            location={location}
            pages={9}
          />
        </Provider>);
      expect(Events.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    });
    it('calls componentDidMount when no page is passed', () => {
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const newLocation = { search: '' };
      const spy = jest.spyOn(Events.prototype, 'componentDidMount');
      const mountedWrapper = mount(
        <Provider store={store}>
          <Events
            events={events}
            isAdmin={isAdmin}
            isLoading={isLoading}
            message={message}
            actions={dispatchActions}
            location={newLocation}
            pages={9}
          />
        </Provider>);
      expect(Events.prototype.componentDidMount).toHaveBeenCalledTimes(4);
    });
  });
});
