import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/Main';

configure({ adapter: new Adapter()});

describe('<Main />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Main />);
  });
  it('should have a home component', () => {
    expect(wrapper.find('Home').length).to.equal(1);
  });
  it('should have a login component', () => {
    expect(wrapper.find('Login').length).to.equal(1);
  });
  it('should have a signup component', () => {
    expect(wrapper.find('Signup').length).to.equal(1);
  });
});
