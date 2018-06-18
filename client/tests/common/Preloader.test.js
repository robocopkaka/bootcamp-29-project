import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Preloader from '../../components/common/Preloader';

configure({ adapter: new Adapter() });

describe('<Preloader />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Preloader />);
  });
  it('should have a div with one child', () => {
    expect(wrapper.find('div').first().children().length).to.equal(1);
  });
});
