import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../components/common/Footer';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });
  it('should have a div with a .container class', () => {
    expect(wrapper.find('.container').length).toBe(1);
  });
});
