import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import { expect } from 'chai';
import HomeButtons from '../../components/HomeButtons';

configure({ adapter: new Adapter() });

describe('<HomeButtons />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeButtons />);
  });
  it('should have a wrapping div', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });
  it('should render two Link components', () => {
    expect(wrapper.find(Link).length).to.equal(2);
  });
});
