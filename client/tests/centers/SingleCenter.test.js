import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import ConnectedSingleCenter, { SingleCenter } from '../../components/centers/containers/SingleCenter';
import events from '../fixtures/events';
import center from '../fixtures/center';

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
  beforeEach(() => {
    wrapper = shallow(<SingleCenter
      center={center}
      events={emptyEvents}
      actions={actions}
      match={match}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedSingleCenter store={store} />);
  });
  it('should have a div with a .min-height-hundred-vh class', () => {
    expect(wrapper.find('.min-height-hundred-vh').length).to.equal(1);
  });
  it('should have 5 child divs inisde the parent div', () => {
    const divs = wrapper.find('.min-height-hundred-vh').children();
    expect(divs.length).to.equal(5);
  });
  it('should render a connected component', () => {
    expect(container.length).to.equal(1);
  });
  it('should have the same props in the container as in initialState', () => {
    expect(container.prop('events')).to.equal(initialState.events.events);
    expect(container.prop('pages')).to.equal(initialState.events.meta.pagination.pages);
    expect(container.prop('center')).to.equal(initialState.centers.center);
    expect(container.prop('isAdmin')).to.equal(initialState.session.isAdmin);
  });
});
