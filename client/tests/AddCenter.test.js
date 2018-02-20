import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import AddCenter from '../components/AddCenter';

configure({ adapter: new Adapter() });

describe('<AddCenter />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddCenter />);
  });
  it('should have two divs with a .container class', () => {
    expect(wrapper.find('.container').length).to.equal(2);
  });
  it('should have text matching -Add a Center, in the second container', () => {
    expect(wrapper.find('.container').at(1).children('h3').text()).to.equal('Add a Center');
  });
  it('should have a form element', () => {
    expect(wrapper.find('form').length).to.equal(1);
  });
  it('should have six divs with .row classes in the form element', () => {
    expect(wrapper.find('form').children().length).to.equal(6);
  });
  it('should have an input element with a #center-name ID', () => {
    expect(wrapper.find('#center-name').length).to.equal(1);
  });
  it('should have an input element with a #center-address ID', () => {
    expect(wrapper.find('#center-address').length).to.equal(1);
  });
  it('should have an input element with a #center-state ID', () => {
    expect(wrapper.find('#center-state').length).to.equal(1);
  });
  it('should have an input element with a .chips class', () => {
    expect(wrapper.find('.chips').length).to.equal(1);
  });
  it('should have an input element with a .file-path-wrapper class', () => {
    expect(wrapper.find('.file-path-wrapper').length).to.equal(1);
  });
  it('should have an button', () => {
    expect(wrapper.find('.chips').length).to.equal(1);
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
