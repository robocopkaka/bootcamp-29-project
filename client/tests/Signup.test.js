import React from 'react';
import { shallow, configure } from 'enzyme';
// import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedSignup, { Signup } from '../components/common/Signup';
import Preloader from '../components/common/Preloader';

configure({ adapter: new Adapter() });


describe('<Signup />', () => {
  let wrapper;
  let store, container;
  const isLoading = false;
  const initialState = {
    register: {
      isLoading: false
    }
  };
  const actions = {
    registerUser: jest.fn().mockImplementation(() => Promise.resolve())
  };
  const hideModal = () => {};
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<Signup
      isLoading={isLoading}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedSignup store={store} />);
  });
  it('should have five input elements', () => {
    expect(wrapper.find('input').length).toBe(5);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should have a a signup-form div', () => {
    const divs = wrapper.find('.signup-form');
    expect(divs.length).toBe(1);
  });
  it('should render a Preloader if isLoading is true', () => {
    const loading = true;
    const loadingWrapper = shallow(<Signup isLoading={loading} />);
    expect(loadingWrapper.find(Preloader).length).toBe(1);
  })
  it('should render a connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have props in the container match those in initial state', () => {
    expect(container.prop('isLoading')).toEqual(initialState.register.isLoading);
  });
  it('should set firstName in state on handleFirstNameChange', () => {
    const instance = wrapper.instance();
    instance.handleFirstNameChange({ target: { value: 'kachi' } });
    expect(instance.state.firstName.value).toBe('kachi');
  });
  it('should set lastName in state on handleLastNameChange', () => {
    const instance = wrapper.instance();
    instance.handleLastNameChange({ target: { value: 'kachi' } });
    expect(instance.state.lastName.value).toBe('kachi');
  });
  it('should set email in state on handleEmailChange', () => {
    const instance = wrapper.instance();
    instance.handleEmailChange({ target: { value: 'kachi@kachi.com' } });
    expect(instance.state.email.value).toBe('kachi@kachi.com');
  });
  it('should set message in state on handleEmailChange if email is invalid', () => {
    const instance = wrapper.instance();
    instance.handleEmailChange({ target: { value: 'kachi@' } });
    expect(instance.state.email.message).toBe('Email is not valid');
  });
  it('should set message in state on handlePasswordChange if password is not up to 6 characters', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'kach' } });
    expect(instance.state.password.message).toBe('Password should have at least 6 characters');
  });
  it('should set password in state on handlePasswordChange', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    expect(instance.state.password.value).toBe('annabeth');
  });
  it('should handle password confirmation change', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    instance.handlePasswordConfirmationChange({ target: { value: 'annabeth' } });
    expect(instance.state.passwordConfirmation.value).toBe('annabeth');
  });
  it('should handle mismatched passwords', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    instance.handlePasswordConfirmationChange({ target: { value: 'annabe' } });
    expect(instance.state.passwordConfirmation.message).toBe('Passwords don\'t match');
  });
  it('should clear fields in state', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    instance.handleEmailChange({ target: { value: 'kachi@kachi.com' } });
    instance.handleFirstNameChange({ target: { value: 'kachi' } });
    instance.handleLastNameChange({ target: { value: 'kachi' } });
    instance.handlePasswordConfirmationChange({ target: { value: 'annabeth' } });
    instance.clearFields();
    expect(instance.state.email.value).toBe('');
    expect(instance.state.password.value).toBe('');
    expect(instance.state.passwordConfirmation.value).toBe('');
    expect(instance.state.firstName.value).toBe('');
    expect(instance.state.lastName.value).toBe('');
  });
  it('should return true if form is valid', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    instance.handleEmailChange({ target: { value: 'kachi@kachi.com' } });
    instance.handleFirstNameChange({ target: { value: 'kachi' } });
    instance.handleLastNameChange({ target: { value: 'kachi' } });
    instance.handlePasswordConfirmationChange({ target: { value: 'annabeth' } });
    expect(instance.formIsValid()).toBe(true);
  });
  it('should return false if form is not valid', () => {
    const instance = wrapper.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    instance.handleEmailChange({ target: { value: 'kachi@kachi' } });
    instance.handleFirstNameChange({ target: { value: 'kachi' } });
    instance.handleLastNameChange({ target: { value: 'kachi' } });
    instance.handlePasswordConfirmationChange({ target: { value: 'annabeth' } });
    expect(instance.formIsValid()).toBe(false);
  });
  it('should call the login method on click', () => {
    const spy = jest.spyOn(Signup.prototype, 'register');
    const wrapper2 = shallow(<Signup />);
    wrapper2.find('button').simulate('click', { preventDefault() {} });
    expect(Signup.prototype.register).toHaveBeenCalledTimes(1);
  });
  it('should call the register method on button click', () => {
    const actionSpy = jest.spyOn(Signup.prototype, 'register');
    const wrapperWithSpy = shallow(<Signup
      someActionProp={actionSpy}
      actions={actions}
      hideModal={hideModal}
    />);
    const instance = wrapperWithSpy.instance();
    instance.handlePasswordChange({ target: { value: 'annabeth' } });
    instance.handleEmailChange({ target: { value: 'kachi@kachi' } });
    instance.handleFirstNameChange({ target: { value: 'kachi' } });
    instance.handleLastNameChange({ target: { value: 'kachi' } });
    instance.handlePasswordConfirmationChange({ target: { value: 'annabeth' } });
    wrapperWithSpy.find('button').simulate('click', { preventDefault() {} });
    expect(Signup.prototype.register).toHaveBeenCalledTimes(2);
  });
});
