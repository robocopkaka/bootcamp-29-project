import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../../components/common/Modal';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
  let wrapper;
  const children = {};
  beforeEach(() => {
    wrapper = shallow(<Modal>{children}</Modal>);
  });
  it('should have a div with two children', () => {
    expect(wrapper.find('.modal').children().length).to.equal(2);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });
  it('should have a child if one is passed in as a prop', () => {
    expect(wrapper.props().children[1].props.children).to.equal(children);
  });
});
