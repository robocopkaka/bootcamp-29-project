import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import AddEvent from '../../components/events/AddEvent';

configure({ adapter: new Adapter() });

describe('<AddEvent />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddEvent />);
  });
  it('should have two divs with a .container class', () => {
    expect(wrapper.find('.container').length).to.equal(2);
  });
  it('should have a div with a .card class', () => {
    expect(wrapper.find('.card').length).to.equal(1);
  });
  it('should have a button', () => {
    expect(wrapper.find('.button').length).to.equal(1);
  });
});
