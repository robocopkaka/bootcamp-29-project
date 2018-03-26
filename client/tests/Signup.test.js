import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Signup } from '../components/common/Signup';

configure({ adapter: new Adapter() });

describe('<Signup />', () => {
  let wrapper;
  const isLoading = false;
  beforeEach(() => {
    wrapper = shallow(<Signup
      isLoading={isLoading}
    />);
  });
  it('should have five input elements', () => {
    expect(wrapper.find('input')).to.have.length(5);
  });
  it('should have a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should have a method that handles firstName change', () => {
    expect(wrapper.instance().handleFirstNameChange({
      target: { value: 's' }
    })).to.be.defined;
  });
  it('should have a method that handles lastName change', () => {
    expect(wrapper.instance().handleLastNameChange({
      target: { value: 's' }
    })).to.be.defined;
  });
  it('should have a method that handles email change', () => {
    expect(wrapper.instance().handleEmailChange({
      target: {value: 's'}
    })).to.be.defined;
  });
  it('should have a method that handles password change', () => {
    expect(wrapper.instance().handlePasswordChange({
      target: {value: 's'}
    })).to.be.defined;
  });
  it('should have a method that handles passwordConfirmation change', () => {
    expect(wrapper.instance().handlePasswordConfirmationChange({
      target: {value: 's'}
    })).to.be.defined;
  });
});
