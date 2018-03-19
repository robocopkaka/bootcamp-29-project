import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { AddCenter } from '../components/centers/containers/AddCenter';
import CentersForm from '../components/centers/presentational/CentersForm';

configure({ adapter: new Adapter() });

describe('<AddCenter />', () => {
  let wrapper;
  const isLoading = false;
  const centerActions = {};
  beforeEach(() => {
    wrapper = shallow(<AddCenter
      isLoading={isLoading}
      centerActions={centerActions}
    />);
  });
  it('should have two divs with a .container class', () => {
    expect(wrapper.find('.container').length).to.equal(2);
  });
  it('should have text matching -Add a Center, in the second container', () => {
    expect(wrapper.find('.container').at(1).children('h3').text()).to.equal('Add a Center');
  });
  it('should have a method that checks if the fields in the form are valid', () => {
    expect(wrapper.instance().formIsValid).to.be.defined;
  });
  it('should have a method that resets validation states', () => {
    expect(wrapper.instance().resetValidationStates).to.be.defined;
  });
  it('should render a CentersForm component', () => {
    expect(wrapper.find(CentersForm).length).to.equal(1);
  });
});
