// import React from 'react';
// import { mount, configure } from 'enzyme';
// import { expect } from 'chai';
//
// import Adapter from 'enzyme-adapter-react-16';
// import AdminProfile from '../components/AdminProfile';
// import CenterList from '../components/CenterList';
// import Search from '../components/Search';
// import EventsListWithImage from '../components/events/EventsListWithImage';
//
// configure({ adapter: new Adapter() });
//
// describe('<AdminProfile />', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(<AdminProfile />);
//   });
//   it('should have a div with an all-events ID', () => {
//     expect(wrapper.find('#all-events').length).to.equal(1);
//   });
//   it('should have a div with an all-centers ID', () => {
//     expect(wrapper.find('#all-centers').length).to.equal(1);
//   });
//   it('should render a CenterList component', () => {
//     expect(wrapper.find(<CenterList />).length).to.equal(1);
//   });
//   it('should render a EventsListWithImage component', () => {
//     expect(wrapper.find(<EventsListWithImage />).length).to.equal(1);
//   });
//   it('should render a Search component twice', () => {
//     expect(wrapper.find(<Search />).length).to.equal(2);
//   });
// });
