import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../components/Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });
  it('should have a nav element', () => {
    expect(wrapper.find('nav').length).to.equal(1);
  });
  it('should have an unordered list in the nav element with an ID - nav-mobile', () => {
    expect(wrapper.find('nav').children().find('#nav-mobile').length).to.equal(1);
  });
  it('should have four list elements in the unordered list with ID nav-mobile', () => {
    expect(wrapper.find('nav').children().find('#nav-mobile').children().length).to.equal(4);
  });
  it('should have an unordered list in the nav element with a class - side-nav', () => {
    expect(wrapper.find('nav').children().find('.side-nav').length).to.equal(1);
  });
  it('should have four list elements in the unordered list with class side-nav', () => {
    expect(wrapper.find('nav').children().find('.side-nav').children().length).to.equal(4);
  });
  it('should have an unordered list inside a list element in the unordered list with a .side-nav class', () => {
    expect(wrapper.find('nav').children().find('.side-nav').children()
      .find('.left-padding')
      .children().length).to.equal(1);
  });
});
