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
  it('should have two unordered list in the nav element', () => {
    expect(wrapper.nav().div().find('ul').length).to.equal(2);
  });
});
