import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import CenterDetail from '../../components/centers/presentational/CenterDetail';

configure({ adapter: new Adapter() });

describe('<CenterDetail />', () => {
  let wrapper;
  const center = {
    name: '',
    capacity: 0,
    detail: '',
    chairs: 0,
    projector: 0,
    address: '',
    state: '',
    image: '',
    id: 0,
    events: []
  };
  const singleCenterActions = {
    fetchSingleCenter: () => {}
  };
  beforeEach(() => {
    wrapper = shallow(<CenterDetail
      center={center}
      singleCenterActions={singleCenterActions}
    />);
  });
  // it('should have a div with a .valign-wrapper class', () => {
  //   expect(wrapper.find('.valign-wrapper').length).to.equal(1);
  // });
  it('should have a div with a .card class', () => {
    expect(wrapper.find('.card').length).to.equal(1);
  });
  it('should have 3 divs inside the div with a .card class', () => {
    expect(wrapper.find('.card').children().length).to.equal(3);
  });
});
