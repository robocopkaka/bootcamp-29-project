import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import CenterList from '../components/centers/presentational/CenterList';

configure({ adapter: new Adapter() });

describe('<Centers />', () => {
  let wrapper;
  const centers = [
    {
      id: 1,
      name: 'name',
      detail: 'detail',
      address: 'address',
      state: 'state',
      capacity: 1000,
      chairs: 10,
      projector: 10,
      image: 'stuff'
    }
  ];
  const isAdmin = false;
  beforeEach(() => {
    wrapper = shallow(<CenterList
      centers={centers}
      isAdmin={isAdmin}
    />);
  });
  it('should have a div with a .card class', () => {
    expect(wrapper.find('.card').length).to.equal(1);
  });
  it('should have three divs inside the .card div', () => {
    expect(wrapper.find('.card').children().length).to.equal(3);
  });
});
