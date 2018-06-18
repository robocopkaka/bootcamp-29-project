import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import expect from 'expect';
import HomeButtons from '../components/HomeButtons';

configure({ adapter: new Adapter() });

describe('<HomeButtons />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeButtons />);
  });
  it('should have a wrapping div', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should render two anchor tags', () => {
    expect(wrapper.find('a').length).toBe(2);
  });
});
