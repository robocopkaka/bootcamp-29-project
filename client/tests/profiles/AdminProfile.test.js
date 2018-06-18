import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
import { Pagination } from 'react-materialize';
import EventsListWithImage from '../../components/events/presentational/EventsListWithImage';
import CenterList from '../../components/centers/presentational/CenterList';
import { AdminProfile } from '../../components/Profiles/AdminProfile';
import Preloader from '../../components/common/Preloader';
import events from '../fixtures/events';
import centers from '../fixtures/centers';

configure({ adapter: new Adapter() });

describe('<AdminProfile />', () => {
  let wrapper, loadingWrapper;
  const isAdmin = false;
  const loading = true;
  const centersLoading = false;
  const eventsLoading = false;
  const actions = {
    fetchCenters: () => {},
    fetchEvents: () => {},
    fetchSingleEvent: () => {},
    fetchSingleCenter: () => {},
    setComponentName: () => {}
  };
  // const initialState = {
  //   events: {
  //     events,
  //     isLoading: false
  //   },
  //   centerId: {
  //     centers,
  //     isLoading: false
  //   },
  //   session: {
  //     userId: 1,
  //     loggedIn: true,
  //     isAdmin: true
  //   }
  // };
  // const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<AdminProfile
      centers={centers}
      events={events}
      isAdmin={isAdmin}
      centersLoading={centersLoading}
      eventsLoading={eventsLoading}
      actions={actions}
      centerPages={4}
      eventPages={4}
    />);
    loadingWrapper = shallow(<AdminProfile
      centers={centers}
      events={events}
      isAdmin={isAdmin}
      centersLoading={loading}
      eventsLoading={loading}
      actions={actions}
    />);
    // const componentDidMountSpy = spy(AdminProfile.prototype, 'componentDidMount');
  });
  // it('should have a div with an all-events ID', () => {
  //   const componentDidMountSpy = spy(AdminProfile.prototype, 'componentDidMount');
  //   expect(AdminProfile.prototype.componentDidMount.calledOnce).to.equal(true);
  //   // expect(wrapper.find('#all-events').length).to.equal(1);
  //   componentDidMountSpy.restore();
  // });
  // it('should have a div with an all-centers ID', () => {
  //   expect(wrapper.find('#all-centers').length).toBe(1);
  // });
  it('should have an EventsListWithImage component', () => {
    expect(wrapper.find(EventsListWithImage).length).toBe(1);
  });
  it('should have a CenterList component', () => {
    expect(wrapper.find(CenterList).length).toBe(1);
  });
  it('should have two preloaders', () => {
    expect(loadingWrapper.find(Preloader).length).toBe(2);
  });
  it('should render two Pagination component', () => {
    expect(wrapper.find(Pagination).length).toBe(2);
  });

  describe('instance methods', () => {
    it('should show modal', () => {
      const instance = wrapper.instance();
      instance.showModal();
      expect(instance.state.show).toBe(true);
    });
    it('should toggle editMode', () => {
      const instance = wrapper.instance();
      instance.toggleEdit();
      expect(instance.state.editMode).toBe(true);
    });
    it('should change value of \'show\' in state to false', () => {
      const instance = wrapper.instance();
      instance.setState({ editMode: true });
      instance.hideModal();
      expect(instance.state.show).toBe(false);
      expect(instance.state.editMode).toBe(false);
    });
    it('should change center page', () => {
      const spy = jest.spyOn(AdminProfile.prototype, 'changePageCenter');
      const dispatchActions = {
        changePageCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve()),
        setComponentName: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const wrapperWithSpy = shallow(<AdminProfile
        centers={centers}
        events={events}
        isAdmin={isAdmin}
        centersLoading={centersLoading}
        eventsLoading={eventsLoading}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.changePageCenter(1);
      expect(instance.state.centerPage).toBe(1);
      expect(AdminProfile.prototype.changePageCenter).toHaveBeenCalledTimes(1);
    });
    it('should change event page', () => {
      const spy = jest.spyOn(AdminProfile.prototype, 'changePageEvent');
      const dispatchActions = {
        changePageCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve()),
        setComponentName: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const wrapperWithSpy = shallow(<AdminProfile
        centers={centers}
        events={events}
        isAdmin={isAdmin}
        centersLoading={centersLoading}
        eventsLoading={eventsLoading}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.changePageEvent(1);
      expect(instance.state.eventPage).toBe(1);
      expect(AdminProfile.prototype.changePageEvent).toHaveBeenCalledTimes(1);
    });
    it('should change event', () => {
      const spy = jest.spyOn(AdminProfile.prototype, 'changeEvent');
      const dispatchActions = {
        changePageCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve()),
        setComponentName: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const wrapperWithSpy = shallow(<AdminProfile
        centers={centers}
        events={events}
        isAdmin={isAdmin}
        centersLoading={centersLoading}
        eventsLoading={eventsLoading}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.changeEvent(2);
      expect(instance.state.eventId).toBe(2);
      expect(AdminProfile.prototype.changeEvent).toHaveBeenCalledTimes(1);
    });
    it('should change center', () => {
      const spy = jest.spyOn(AdminProfile.prototype, 'changeCenter');
      const dispatchActions = {
        changePageCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve()),
        setComponentName: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const wrapperWithSpy = shallow(<AdminProfile
        centers={centers}
        events={events}
        isAdmin={isAdmin}
        centersLoading={centersLoading}
        eventsLoading={eventsLoading}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.changeCenter(2);
      expect(instance.state.centerId).toBe(2);
      expect(AdminProfile.prototype.changeCenter).toHaveBeenCalledTimes(1);
    });
    it('should delete event', () => {
      const spy = jest.spyOn(AdminProfile.prototype, 'deleteEvent');
      const dispatchActions = {
        changePageCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEvents: jest.fn().mockImplementation(() => Promise.resolve()),
        setComponentName: jest.fn().mockImplementation(() => Promise.resolve()),
        deleteEvent: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const wrapperWithSpy = shallow(<AdminProfile
        centers={centers}
        events={events}
        isAdmin={isAdmin}
        centersLoading={centersLoading}
        eventsLoading={eventsLoading}
        actions={dispatchActions}
      />);
      const instance = wrapperWithSpy.instance();
      instance.deleteEvent(2);
      expect(AdminProfile.prototype.deleteEvent).toHaveBeenCalledTimes(1);
    });
  });
});
