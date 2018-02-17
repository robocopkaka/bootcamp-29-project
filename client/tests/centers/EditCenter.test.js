import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import EditCenter from '../../components/centers/EditCenter';

configure({ adapter: new Adapter() });

describe('<EditCenter />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EditCenter />);
  });
  it('should have a form element', () => {
    expect(wrapper.find('form').length).to.equal(1);
  });
  it('should have a nav element', () => {
    expect(wrapper.find('nav').length).to.equal(1);
  });
  it('should have a footer element', () => {
    expect(wrapper.find('footer').length).to.equal(1);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });
  it('should have a method that handles change to each input element', () => {
    expect(wrapper.instance().onChange).to.be.defined;
  });
  it('should have a method that checks if the fields in the form are valid', () => {
    expect(wrapper.instance().formIsValid).to.be.defined;
  });
  it('should have a method that resets validation states', () => {
    expect(wrapper.instance().resetValidationStates).to.be.defined;
  });
});
