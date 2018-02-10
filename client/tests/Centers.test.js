import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Centers from '../components/Centers';

configure({ adapter: new Adapter() });

describe('<Centers />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Centers />);
  });
  it('should have a CenterList component in it', () => {
    expect(wrapper.find('<CenterList />').length).to.equal(1);
  });
  it('should have a Search component in it', () => {
    expect(wrapper.find('<Search />').length).to.equal(1);
  });
});
