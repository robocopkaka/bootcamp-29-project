import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedEditEvent, { EditEvent } from '../../components/events/container/EditEvent';
import event from '../fixtures/event';

configure({ adapter: new Adapter() });

describe('<EditEvent />', () => {
  let wrapper;
  const actions = {
    fetchSingleEvent: () => {},
    updateEvent: () => {}
  };
  const initialState = {
    events: {
      event
    }
  }
  let store, container;
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<EditEvent
      event={event}
      actions={actions}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedEditEvent store={store} />);
  });
  it('should have parent div with a .max-width-six-hundred class', () => {
    expect(wrapper.find('.max-width-six-hundred').length).to.equal(1);
  });
  it('should have a method for handling input change', () => {
    expect(wrapper.instance().handleChange).to.be.a('function');
  });
  it('should have a method for handling change to the date field', () => {
    expect(wrapper.instance().handleDateChange).to.be.a('function');
  });
  it('should have a method for handling change to the select field for centers', () => {
    expect(wrapper.instance().handleSelectCategoryChange).to.be.a('function');
  });
  it('should have a method for checking of a form is valid', () => {
    expect(wrapper.instance().formIsValid).to.be.a('function');
  });
  it('should have a method for resetting validation states', () => {
    expect(wrapper.instance().resetValidationStates).to.be.a('function');
  });
  it('should have a method for updating an event', () => {
    expect(wrapper.instance().updateEvent).to.be.a('function');
  });
  it('should have a h3 element with text matching - Edit an Event', () => {
    expect(wrapper.find('h3').text()).to.equal('Edit an Event');
  });
  it('should render a connected component', () => {
    expect(container.length).to.equal(1);
  });
  it('should have props in the container match those in state', () => {
    expect(container.prop('event')).to.equal(initialState.events.event);
  });
});
