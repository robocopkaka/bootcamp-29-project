import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import chai, { expect } from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import ConnectedLogin, { Login } from '../components/common/Login';
import Preloader from '../components/common/Preloader';

// chai.use(spies);

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper;
  const isLoading = false;
  const initialState = {
    session: {
      isLoading: false
    }
  };
  let store, container;
  const actions = {
    loginUser: jest.fn().mockImplementation(() => Promise.resolve())
  };
  const hideModal = () => {};
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<Login
      isLoading={isLoading}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedLogin store={store} />);
  });
  // it('should have two input elements', () => {
  //   expect(wrapper.find('input').length).to.equal(2);
  // });
  // it('should have a button', () => {
  //   expect(wrapper.find('button').length).to.equal(1);
  // });
  it('should call the login method on click', () => {
    const spy = jest.spyOn(Login.prototype, 'login');
    const wrapper2 = shallow(<Login
      isLoading={isLoading}
    />);
    wrapper2.find('button').simulate('click', { preventDefault() {} });
    expect(Login.prototype.login).toHaveBeenCalledTimes(1);
  });
  it('should have a method that logins a user', () => {
    expect(wrapper.instance().login).toBeDefined();
  });
  it('should have a method that validates a form', () => {
    expect(wrapper.instance().formIsValid()).toBeDefined();
  });
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the connected component as in initialState', () => {
    expect(container.prop('isLoading')).toEqual(initialState.session.isLoading);
  });
  it('should return a Preloader if isLoading is true', () => {
    const loading = true
    const wrapper2 = shallow(<Login
      isLoading={loading}
    />);
    expect(wrapper2.find(Preloader).length).toBe(1);
  });
  it('should set email state on handleEmailChange', () => {
    const instance = wrapper.instance();
    instance.handleEmailChange({ target: { value: 'email' } });
    expect(instance.state.email.value).toBe('email');
    // console.log(instance, 'instance');
  });
  it('should set password state on handlePasswordChange', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'password' } });
    expect(instance.state.password.value).toBe('password');
    // console.log(instance, 'instance');
  });
  it('should clear state when clearFields is called', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'password' } });
    instance.handleEmailChange({ target: { value: 'email' } });
    instance.clearFields();
    expect(instance.state.password.value).toBe('');
    expect(instance.state.email.value).toBe('');
  });
  it('should return true if form is valid', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'password' } });
    instance.handleEmailChange({ target: { value: 'email@email.com' } });
    expect(instance.formIsValid()).toBe(true);
  });
  it('should dispatch an action on login', () => {
    const actionSpy = jest.spyOn(Login.prototype, 'login');
    const wrapperWithSpy = shallow(<Login
      someActionProp={actionSpy}
      actions={actions}
      hideModal={hideModal}
      isLoading={isLoading}
    />);
    const instance = wrapperWithSpy.instance();
    instance.handlePasswordChange({ target: { value: 'password' } });
    instance.handleEmailChange({ target: { value: 'email@email.com' } });
    wrapperWithSpy.find('button').simulate('click', { preventDefault() {} });
    expect(Login.prototype.login).toHaveBeenCalledTimes(2);
  });
});
