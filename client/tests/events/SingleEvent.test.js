import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedSingleEvent, { SingleEvent } from '../../components/events/container/SingleEvent';
import EventDetails from '../../components/events/presentational/EventDetails';
import event from '../fixtures/event';


configure({ adapter: new Adapter() });

describe('<SingleEvent />', () => {
  let wrapper;
  const actions = {
    fetchSingleEvent: () => {}
  };
  const match = {
    params: {
      id: 0
    }
  };
  const initialState = {
    events: {
      event
    }
  };
  let store, container;
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<SingleEvent
      event={event}
      actions={actions}
      match={match}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedSingleEvent
      store={store}
      actions={actions}
      match={match}
    />);
  });
  it('should render event details', () => {
    expect(wrapper.find(EventDetails).length).to.equal(1);
  });
  it('should have events in prop', () => {
    const instance = wrapper.instance();
    expect(instance.props.event).to.equal(event);
  });
  it('should render the connected component', () => {
    expect(container.length).to.equal(1);
  });
  it('should have the same props in the container as in state', () => {
    expect(container.prop('event')).to.equal(initialState.events.event);
  });
  it('should have the same props in the container as in state', () => {
    expect(container.prop('event')).to.equal(initialState.events.event);
  });
});
