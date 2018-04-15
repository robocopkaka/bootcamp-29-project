import React from 'react';
import { shallow, configure } from 'enzyme';
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
  it('should have a div with a .center-detail-container class', () => {
    expect(wrapper.find('.center-detail-container').length).to.equal(1);
  });
  it('should have an image tag', () => {
    expect(wrapper.find('img').length).to.equal(1);
  });
  it('should have eight tags', () => {
    expect(wrapper.find('p').length).to.equal(8);
  });
});
