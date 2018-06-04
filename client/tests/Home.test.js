import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedHome, { Home } from '../components/Home';
import centers from './fixtures/centers';
import events from './fixtures/events';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  let wrapper;
  const centersLoading = false;
  const eventsLoading = false;
  const loggedIn = false;

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
  });

  // it('should have a parent div with a class - home-container', () => {
  //   const divs = wrapper.find('.home-container');
  //   expect(divs.length).to.equal(1);
  // });
  it('should have two rows that contains some centers and events', () => {
    const rows = wrapper.find('.row');
    expect(rows.length).to.equal(2);
  });
  it('should render the connected component', () => {
    expect(container.length).to.equal(1);
  });
  it('should have the same props in the container as in initialState', () => {
    expect(container.prop('centers')).to.deep.equal(initialState.centers.centers);
    expect(container.prop('events')).to.deep.equal(initialState.events.events);
    expect(container.prop('centersLoading')).to.equal(initialState.centers.isLoading);
    expect(container.prop('eventsLoading')).to.equal(initialState.events.isLoading);
    expect(container.prop('loggedIn')).to.equal(initialState.session.loggedIn);
  });
});
