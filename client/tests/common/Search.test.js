import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../../components/common/Search';

configure({ adapter: new Adapter() });

describe('<Search />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Search />);
  });
  it('should have a div with a child in it', () => {
    expect(wrapper.find('div').first().children().length).to.equal(1);
  });
  it('should have a form', () => {
    expect(wrapper.find('form').length).to.equal(1);
  });
});
