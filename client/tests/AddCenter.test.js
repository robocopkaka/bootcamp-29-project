import React from 'react';
import { shallow, configure, mount } from 'enzyme';
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
    expect(wrapper.find('.container').length).toBe(2);
  });
  it('should have text matching -Add a Center, in the second container', () => {
    expect(wrapper.find('.container').at(1).children('h3').text()).toBe('Add a Center');
  });
  it('should have a method that checks if the fields in the form are valid', () => {
    expect(wrapper.instance().formIsValid).toBeDefined();
  });
  it('should have a method that resets validation states', () => {
    expect(wrapper.instance().resetValidationStates).toBeDefined();
  });
  it('should render a CentersForm component', () => {
    expect(wrapper.find(CentersForm).length).toBe(1);
  });
  it('should have a method that handles change to each input element', () => {
    expect(wrapper.instance().handleChange).toBeDefined();
  });
  it('should have a method that gets a signed request from S3', () => {
    expect(wrapper.instance().getSignedRequest).toBeDefined();
  });
  it('should have a method that uploads a file to S3', () => {
    expect(wrapper.instance().uploadFile).toBeDefined();
  });
});
