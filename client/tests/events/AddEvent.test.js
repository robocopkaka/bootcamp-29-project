import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedAddEvent, { AddEvent } from '../../components/events/container/AddEvent';


configure({ adapter: new Adapter() });

describe('<AddEvent />', () => {
  let wrapper;
  const actions = {
    fetchCenters: () => {}
  };
  let store, container;
  const mockStore = configureStore();
  const initialState = {};
  beforeEach(() => {
    wrapper = shallow(<AddEvent
      actions={actions}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedAddEvent store={store} />);
  });
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
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
    it('should clear fields', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      instance.handleChange({ target: { name: 'detail', value: 'kachi' } });
      instance.handleChange({ target: { name: 'guests', value: '1000' } });
      instance.handleDateChange({}, '2018-08-08');
      instance.clearFields();
      expect(instance.state.name.value).toBe('');
      expect(instance.state.detail.value).toBe('');
      expect(instance.state.guests.value).toBe('');
      expect(instance.state.date.value).toBe('');
    });
  });
  describe('test addEvent interactions', () => {
    it('should call the addEvent method onClick', () => {
      const dispatchActions = {
        addEvent: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const hideModal = () => {};
      const spy = jest.spyOn(AddEvent.prototype, 'addEvent');
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <AddEvent actions={dispatchActions} someActionProp={spy} hideModal={hideModal} />
        </Provider>);
      wrapperWithSpy.find('button').simulate('click', { preventDefault() {} });
      expect(AddEvent.prototype.addEvent).toHaveBeenCalledTimes(1);
    });
  });
});
