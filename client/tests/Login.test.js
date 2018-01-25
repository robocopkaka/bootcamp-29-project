import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/Login.jsx';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
});
