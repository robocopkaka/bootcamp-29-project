import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { expect } from 'chai';
import expect from 'expect'
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { Pagination } from 'react-materialize';
import ConnectedSingleCenter, { SingleCenter } from '../../components/centers/containers/SingleCenter';
import Modal from '../../components/common/Modal';
import EventsListWithImage from '../../components/events/presentational/EventsListWithImage';
import CenterDetail from '../../components/centers/presentational/CenterDetail';
import events from '../fixtures/events';
import center from '../fixtures/center';
// import * as indexStyles from '../../css/index.module.css';

configure({ adapter: new Adapter() });

describe('<SingleCenter />', () => {
  let wrapper;
  const emptyEvents = [];
  const actions = {
    fetchSingleCenter: () => {},
    fetchEventsInCenter: () => {}
  };
  const match = {
    params: {
      id: 0
    }
  };
  const initialState = {
    events: {
      events,
      meta: {
        pagination: {
          pages: 1
        }
      }
    },
    centers: {
      center
    },
    session: {
      isAdmin: true
    }
  };
  let store, container;
  const mockStore = configureStore();
  store = mockStore(initialState);
  beforeEach(() => {
    wrapper = shallow(
      <SingleCenter
        center={center}
        events={events}
        actions={actions}
        pages={4}
        match={match}
      />);
    container = shallow(<ConnectedSingleCenter store={store} />);
  });
  // it('should have a div with a .min-height-hundred-vh class', () => {
  //   // (`${indexStyles['min-height-hundred-vh']}`
  //   // expect(wrapper.find(`${indexStyles['min-height-hundred-vh']}`).length).to.equal(1);
  //   expect(wrapper.find('div').first().hasClass(`${indexStyles['min-height-hundred-vh']}`)).to.equal(true);
  // });
  // it('should have 5 child divs inisde the parent div', () => {
  //   const divs = wrapper.find(`${indexStyles['min-height-hundred-vh']}`).children();
  //   expect(divs.length).to.equal(5);
  // });
  it('should render the Modal component', () => {
    expect(wrapper.find(Modal).length).toBe(1);
    // console.log(wrapper.debug());
  });
  it('should render the CenterDetail component', () => {
    expect(wrapper.find(CenterDetail).length).toBe(1);
  });
  it('should render the Pagination component', () => {
    expect(wrapper.find(Pagination).length).toBe(1);
  });
  it('should render the EventsListWithImage component', () => {
    expect(wrapper.find(EventsListWithImage).length).toBe(1);
  });
  it('calls componentDidMount', () => {
    sinon.spy(SingleCenter.prototype, 'componentDidMount');
    const mountedWrapper = mount(
      <Provider store={store}>
        <SingleCenter
          actions={actions}
          pages={4}
          center={center}
          events={events}
        />
      </Provider>, {
        attachTo: document.getElementById('app')
      });
    expect(SingleCenter.prototype.componentDidMount.calledOnce).toBe(true);
  });
  it('should render a connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the container as in initialState', () => {
    expect(container.prop('events')).toEqual(initialState.events.events);
    expect(container.prop('pages')).toEqual(initialState.events.meta.pagination.pages);
    expect(container.prop('center')).toEqual(initialState.centers.center);
    expect(container.prop('isAdmin')).toEqual(initialState.session.isAdmin);
  });

  describe('instance methods', () => {
    it('should change page', () => {
      const spy = jest.spyOn(SingleCenter.prototype, 'changePage');
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEventsInCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const admin = true;
      // history.push = jest.fn();
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <SingleCenter
            pages={4}
            center={center}
            events={events}
            actions={dispatchActions}
            isAdmin={admin}
          />
        </Provider>);
      // console.log(wrapperWithSpy.debug());
      wrapperWithSpy.find('li').last().simulate('click');
      expect(SingleCenter.prototype.changePage).toHaveBeenCalledTimes(1);
    });
    it('should show modal', () => {
      const instance = wrapper.instance();
      instance.showModal();
      expect(instance.state.show).toBe(true);
    });
    it('should hide modal', () => {
      const instance = wrapper.instance();
      instance.setState({ editMode: true });
      instance.showModal();
      instance.hideModal();
      expect(instance.state.show).toBe(false);
      expect(instance.state.editMode).toBe(false);
    });
    it('should toggleEdit mode', () => {
      const instance = wrapper.instance();
      instance.toggleEdit();
      expect(instance.state.editMode).toBe(true);
    });
    it('should set eventId in state', () => {
      const admin = true;
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEventsInCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const spy = jest.spyOn(SingleCenter.prototype, 'changeEvent');
      const wrapperWithSpy = shallow(<SingleCenter
        pages={4}
        center={center}
        events={events}
        actions={dispatchActions}
        isAdmin={admin}
      />);
      const instance = wrapperWithSpy.instance();
      // console.log(instance);
      instance.changeEvent(1);
      expect(instance.state.eventId).toBe(1);
    });
    it('should delete event', () => {
      const admin = true;
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchEventsInCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        deleteEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const spy = jest.spyOn(SingleCenter.prototype, 'deleteEvent');
      const wrapperWithSpy = mount(
        <Provider store={store}><SingleCenter
          pages={9}
          center={center}
          events={events}
          actions={dispatchActions}
          isAdmin={admin}
        />
        </Provider>);
      wrapperWithSpy.find('.card-action').first().children().at(1)
        .simulate('click');
      expect(SingleCenter.prototype.deleteEvent).toHaveBeenCalledTimes(1);
    });
  });
});
