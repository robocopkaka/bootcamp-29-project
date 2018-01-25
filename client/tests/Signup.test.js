import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Signup from '../components/Signup.jsx';

configure({ adapter: new Adapter() });

describe('<Signup />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Signup />);
  });
  it('should have five input elements', () => {
    expect(wrapper.find('input')).to.have.length(5);
  });
  it('should have a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should have a method that handles firstName change', () => {
    expect(wrapper.instance().handleFirstNameChange({
      target: {value: 's'}
    })).to.be.defined;
  });
});
