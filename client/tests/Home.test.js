import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../components/Home';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });
  it('should have a parent div with a .slider class', () => {
    expect(wrapper.find('.slider').length).to.equal(1);
  });
  it('should have a ul element inside the parent div', () => {
    expect(wrapper.find('ul').length).to.equal(1);
  });
  it('should have three li elements inside the unordered list', () => {
    expect(wrapper.find('ul').children().length).to.equal(3);
  });
  it('should have three images', () => {
    expect(wrapper.find('img').length).to.equal(3);
  });
  it('should have the text in the first li element be \'Kachi\'s Event Manager\'', () => {
    expect(wrapper.find('li').at(0).text()).to.equal('Kachi\'s Event Manager');
  });
  it('should have the text in the first li element be \'Find centers that suit you\'', () => {
    expect(wrapper.find('li').at(0).text()).to.equal('Find centers that suit you');
  });
  it('should have the text in the first li element be \'Find centers that suit you\'', () => {
    expect(wrapper.find('li').at(0).text()).to.equal('And events you\'ll want to attend');
  });
});
