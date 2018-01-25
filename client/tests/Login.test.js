import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/Login.jsx';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  it('should have two input elements', () => {
    expect(wrapper.find('input').length).to.equal(2);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });
  it('should have a method that handles changes in the password field', () => {
    expect(wrapper.instance().handlePasswordChange({
      target: { value: 's' }
    })).to.be.defined;
  });
  it('should have a method that handles changes in the email field', () => {
    expect(wrapper.instance().handleEmailChange({
      target: { value: 's' }
    })).to.be.defined;
  });
});
