import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import EditEvent from '../../components/events/EditEvent';

configure({ adapter: new Adapter() });

describe('<EditEvent />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EditEvent />);
  });
  it('should have a card', () => {
    expect(wrapper.find('.card').length).to.equal(1);
  });
  it('should have a form', () => {
    expect(wrapper.find('form').length).to.equal(1);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });
  it('should have a method for handling input change', () => {
    expect(wrapper.instance().handleChange).to.be.defined;
  });
  it('should have a method for handling change to the date field', () => {
    expect(wrapper.instance().handleDateChange).to.be.defined;
  });
  it('should have a method for handling change to the time field', () => {
    expect(wrapper.instance().handleTimeChange).to.be.defined;
  });
  it('should have a method for handling change to the select field for centers', () => {
    expect(wrapper.instance().handleSelectCenterChange).to.be.defined;
  });
  it('should have a method for handling change to the select field for centers', () => {
    expect(wrapper.instance().handleSelectCategoryChange).to.be.defined;
  });
  it('should have a method for checking of a form is valid', () => {
    expect(wrapper.instance().formIsValid).to.be.defined;
  });
  it('should have a method for resetting validation states', () => {
    expect(wrapper.instance().resetValidationStates).to.be.defined;
  });
  it('should have a method for updating an event', () => {
    expect(wrapper.instance().updateEvent).to.be.defined;
  });
});
