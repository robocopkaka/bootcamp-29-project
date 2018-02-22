import React from 'react';
import { mount, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import AddEvent from '../../components/events/AddEvent';
import SelectCenter from '../../centers/SelectCenter';

configure({ adapter: new Adapter() });

describe('<AddEvent />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<AddEvent />);
  });
  it('should have two divs with a .container class', () => {
    expect(wrapper.find('.container').length).to.equal(2);
  });
  it('should have a div with a .card class', () => {
    expect(wrapper.find('.card').length).to.equal(1);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });
  it('should have a form', () => {
    expect(wrapper.find('form').length).to.equal(1);
  });
  it('should render a SelectCenter component', () => {
    expect(wrapper.find(SelectCenter).length).to.equal(1);
  });
});
