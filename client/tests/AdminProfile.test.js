import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { AdminProfile } from '../components/Profiles/AdminProfile';

configure({ adapter: new Adapter() });

describe('<AdminProfile />', () => {
  let wrapper;
  const centers = [];
  const events = [];
  const isAdmin = false;
  const centersLoading = false;
  const eventsLoading = false;
  const actions = {
    fetchCenters: () => {},
    fetchEvents: () => {},
    setComponentName: () => {}
  };

  beforeEach(() => {
    wrapper = shallow(<AdminProfile
      centers={centers}
      events={events}
      isAdmin={isAdmin}
      centersLoading={centersLoading}
      eventsLoading={eventsLoading}
      actions={actions}
    />);
    // const componentDidMountSpy = spy(AdminProfile.prototype, 'componentDidMount');
  });
  // it('should have a div with an all-events ID', () => {
  //   const componentDidMountSpy = spy(AdminProfile.prototype, 'componentDidMount');
  //   expect(AdminProfile.prototype.componentDidMount.calledOnce).to.equal(true);
  //   // expect(wrapper.find('#all-events').length).to.equal(1);
  //   componentDidMountSpy.restore();
  // });
  it('should have a div with an all-centers ID', () => {
    expect(wrapper.find('#all-centers').length).to.equal(1);
  });
});
