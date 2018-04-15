import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from '../components/common/Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper;
  const isLoading = false;
  beforeEach(() => {
    wrapper = shallow(<Login
      isLoading={isLoading}
    />);
  });
  it('should have two input elements', () => {
    expect(wrapper.find('input').length).toBe(2);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });
  // it('should have a method that handles changes in the password field', () => {
  //   expect(wrapper.instance().handlePasswordChange({
  //     // target: { value: 's' }
  //   })).toBeDefined();
  // });
  // it('should have a method that handles changes in the email field', () => {
  //   expect(wrapper.instance().handleEmailChange({
  //     // target: { value: 's' }
  //   })).toBeDefined();
  // });
  it('should have a method that logins a user', () => {
    expect(wrapper.instance().login).toBeDefined();
  });
  it('should have a method that validates a form', () => {
    expect(wrapper.instance().formIsValid()).toBeDefined();
  });
});
