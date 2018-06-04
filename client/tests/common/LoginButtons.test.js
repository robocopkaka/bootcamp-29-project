import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import LoginButtons from '../../components/LoginButtons'

configure({ adapter: new Adapter() });

describe('<HomeButtons />', () => {
  let wrapper;
  const showModal = () => {};
  const toggleSignup = () => {};

  beforeEach(() => {
    wrapper = shallow(<LoginButtons showModal={showModal} toggleSignup={toggleSignup} />);
  });
  it('should two buttons', () => {
    expect(wrapper.find('button').length).to.equal(2);
  });
});
