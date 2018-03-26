// import React from 'react';
// import { shallow, configure, mount } from 'enzyme';
// import { expect } from 'chai';
// import { spy } from 'sinon';
// import Adapter from 'enzyme-adapter-react-16';
// import { AdminProfile } from '../components/Profiles/AdminProfile';
// import CenterList from '../components/centers/presentational/CenterList';
// import Search from '../components/common/Search';
// import EventsListWithImage from '../components/events/presentational/EventsListWithImage';
//
// configure({ adapter: new Adapter() });
//
// describe('<AdminProfile />', () => {
//   let wrapper;
//   const centers = [];
//   const events = [];
//   const isAdmin = false;
//   const centersLoading = false;
//   const eventsLoading = false;
//
//   beforeEach(() => {
//     wrapper = shallow(<AdminProfile
//       centers={centers}
//       events={events}
//       isAdmin={isAdmin}
//       centersLoading={centersLoading}
//       eventsLoading={eventsLoading}
//     />);
//     const componentDidMountSpy = spy(AdminProfile.prototype, 'componentDidMount');
//   });
//   it('should have a div with an all-events ID', () => {
//     const componentDidMountSpy = spy(AdminProfile.prototype, 'componentDidMount');
//     expect(AdminProfile.prototype.componentDidMount.calledOnce).to.equal(true);
//     // expect(wrapper.find('#all-events').length).to.equal(1);
//     componentDidMountSpy.restore();
//   });
//   it('should have a div with an all-centers ID', () => {
//     expect(wrapper.find('#all-centers').length).to.equal(1);
//   });
//   it('should render a CenterList component', () => {
//     expect(wrapper.find(CenterList).length).to.equal(1);
//   });
//   it('should render a EventsListWithImage component', () => {
//     expect(wrapper.find(EventsListWithImage).length).to.equal(1);
//   });
//   it('should render a Search component twice', () => {
//     expect(wrapper.find(Search).length).to.equal(2);
//   });
// });
