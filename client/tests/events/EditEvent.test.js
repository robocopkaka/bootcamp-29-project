import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
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
  };
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
  it('should render a connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have props in the container match those in state', () => {
    expect(container.prop('event')).toEqual(initialState.events.event);
  });

  describe('handle change methods', () => {
    it('should set name in state if the value in the name field changes', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      expect(instance.state.name.value).toEqual('kachi');
    });
    it('should set detail in state if the value in the detail field changes', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'detail', value: 'kachi' } });
      expect(instance.state.detail.value).toEqual('kachi');
    });
    it('should set guests in state if the value in the guests field changes', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'guests', value: '1000' } });
      expect(instance.state.guests.value).toEqual('1000');
    });
    it('should set date in state if the value in the date field changes', () => {
      const instance = wrapper.instance();
      instance.handleDateChange({}, '2018-08-08');
      expect(instance.state.date.value).toEqual('2018-08-08');
    });
  });
  describe('helper instance methods', () => {
    it('should return true if form is valid', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      instance.handleChange({ target: { name: 'detail', value: 'kachi' } });
      instance.handleChange({ target: { name: 'guests', value: '1000' } });
      instance.handleDateChange({}, '2018-08-08');
      expect(instance.formIsValid()).toEqual(true);
    });
    it('should return false if form is not valid', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      instance.handleChange({ target: { name: 'detail', value: 'kachi' } });
      instance.handleDateChange({}, '2018-08-08');
      expect(instance.formIsValid()).toEqual(false);
    });
    it('should reset validation states', () => {
      const instance = wrapper.instance();
      instance.setState({
        name: Object.assign({}, instance.state.name, { isValid: false }),
        detail: Object.assign({}, instance.state.name, { isValid: false })
      });
      // console.log(instance)
      instance.resetValidationStates();
      expect(instance.state.name.isValid).toBe(true);
      expect(instance.state.detail.isValid).toBe(true);
    });
  });
  describe('spy method interactions', () => {
    it('should call the updateEvent method on button click', () => {
      const dispatchActions = {
        updateEvent: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const hideModal = () => {};
      const spy = jest.spyOn(EditEvent.prototype, 'updateEvent');
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <EditEvent actions={dispatchActions} someActionProp={spy} hideModal={hideModal} />
        </Provider>);
      wrapperWithSpy.find('button').simulate('click');
      expect(EditEvent.prototype.updateEvent).toHaveBeenCalledTimes(1);
    });
  });
});
