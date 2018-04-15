import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import ConnectedEvents, { Events } from '../../components/events/container/Events';
import events from '../fixtures/events';

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
    search: {
      page: 1
    }
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
  it('should have a fixed action button if there are events passed as props', () => {
    expect(wrapper.find('.fixed-action-btn').length).to.equal(1);
  });
  it('should notify the user that there no events if the events array is empty', () => {
    const text = noEventsWrapper.find('p').text();
    expect(text).to.equal('No events found yet');
  });
  it('should render the connected component', () => {
    expect(container.length).to.equal(1);
  });
  it('should have the same props in the container match those in state', () => {
    expect(container.prop('events')).to.equal(initialState.events.events);
    expect(container.prop('message')).to.equal(initialState.events.message);
    expect(container.prop('isLoading')).to.equal(initialState.events.isLoading);
    expect(container.prop('pages')).to.equal(initialState.events.meta.pagination.pages);
    expect(container.prop('isAdmin')).to.equal(initialState.session.isAdmin);
  });
});
