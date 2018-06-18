import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
// import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Pagination } from 'react-materialize';
// import { Provider } from 'react-redux';
import Preloader from '../../components/common/Preloader';
import { UserProfile } from '../../components/Profiles/UserProfile';
import events from '../fixtures/events';

configure({ adapter: new Adapter() });

describe('<UserProfile />', () => {
  let wrapper, loadingWrapper, emptyWrapper;
  const userId = 1;
  const loading = true;
  const loggedIn = true;
  const isLoading = false;
  const emptyEvents = [];
  const actions = {
    fetchEventsForUser: () => {}
  };
  // const initialState = {
  //   events: {
  //     events,
  //     isLoading: false
  //   },
  //   session: {
  //     userId: 1,
  //     loggedIn: true
  //   }
  // };
  // const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<UserProfile
      isLoading={isLoading}
      loggedIn={loggedIn}
      userId={userId}
      events={events}
      actions={actions}
      pages={4}
    />);
    emptyWrapper = shallow(<UserProfile
      isLoading={isLoading}
      loggedIn={loggedIn}
      userId={userId}
      events={emptyEvents}
      actions={actions}
    />);
    loadingWrapper = shallow(<UserProfile
      isLoading={loading}
      loggedIn={loggedIn}
      userId={userId}
      events={events}
      actions={actions}
    />);
  });
  it('should show a Preloader if isLoading is true', () => {
    expect(loadingWrapper.find(Preloader).length).toBe(1);
  });
  it('should render a Pagination component', () => {
    expect(wrapper.find(Pagination).length).toBe(1);
  });
  it('should have one div if there are no events in props', () => {
    expect(emptyWrapper.find('div').length).toBe(1);
  });

  describe('instance methods', () => {
    it('should show modal', () => {
      const instance = wrapper.instance();
      instance.showModal();
      expect(instance.state.show).toBe(true);
    });
    it('should change value of \'show\' in state to false', () => {
      const instance = wrapper.instance();
      instance.setState({ editMode: true });
      instance.hideModal();
      expect(instance.state.show).toBe(false);
      expect(instance.state.editMode).toBe(false);
    });
    it('should toggleEdit mode', () => {
      const instance = wrapper.instance();
      instance.toggleEdit();
      expect(instance.state.editMode).toBe(true);
    });
    it('should change page', () => {
      const spy = jest.spyOn(UserProfile.prototype, 'changePage');
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEventsForUser: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const wrapperWithSpy = shallow(<UserProfile
        isLoading={isLoading}
        loggedIn={loggedIn}
        userId={userId}
        events={events}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.changePage(1);
      expect(instance.state.page).toBe(1);
      expect(UserProfile.prototype.changePage).toHaveBeenCalledTimes(1);
    });
    it('should change event', () => {
      const spy = jest.spyOn(UserProfile.prototype, 'changeEvent');
      const dispatchActions = {
        changeEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEventsForUser: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const wrapperWithSpy = shallow(<UserProfile
        isLoading={isLoading}
        loggedIn={loggedIn}
        userId={userId}
        events={events}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.changeEvent(2);
      expect(instance.state.eventId).toBe(2);
      expect(UserProfile.prototype.changeEvent).toHaveBeenCalledTimes(1);
    });
    it('should delete event', () => {
      const spy = jest.spyOn(UserProfile.prototype, 'deleteEvent');
      const dispatchActions = {
        changeEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEventsForUser: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        deleteEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const wrapperWithSpy = shallow(<UserProfile
        isLoading={isLoading}
        loggedIn={loggedIn}
        userId={userId}
        events={events}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.deleteEvent(2);
      expect(UserProfile.prototype.deleteEvent).toHaveBeenCalledTimes(1);
    });
  });
});
