import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from '../components/common/Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let wrapper;
  const loggedIn = false;
  const isAdmin = false;
  beforeEach(() => {
    wrapper = shallow(<Header
      loggedIn={loggedIn}
      isAdmin={isAdmin}
    />);
  });
  it('should have a nav element', () => {
    expect(wrapper.find('nav').length).toBe(1);
  });
  it('should have an unordered list in the nav element with an ID - nav-mobile', () => {
    expect(wrapper.find('nav').children().find('#nav-mobile').length).toBe(1);
  });
  it('should have four list elements in the unordered list with ID nav-mobile', () => {
    expect(wrapper.find('nav').children().find('#nav-mobile').children().length).toBe(4);
  });
  it('should have an unordered list in the nav element with a class - side-nav', () => {
    expect(wrapper.find('nav').children().find('.side-nav').length).toBe(1);
  });
  it('should have four list elements in the unordered list with class side-nav', () => {
    expect(wrapper.find('nav').children().find('.side-nav').children().length).toBe(4);
  });
  it('should have an unordered list inside a list element in the unordered list with a .side-nav class', () => {
    expect(wrapper.find('nav').children().find('.side-nav').children()
      .find('.left-padding')
      .children().length).toBe(1);
  });
});
