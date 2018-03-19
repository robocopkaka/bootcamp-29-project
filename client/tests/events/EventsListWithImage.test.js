// import React from 'react';
// import { shallow, configure } from 'enzyme';
// import { expect } from 'chai';
// import Adapter from 'enzyme-adapter-react-16';
// import EventsListWithImage from '../../components/events/EventsListWithImage';
//
// configure({ adapter: new Adapter() });
//
// describe('<EventsList />', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<EventsListWithImage />);
//   });
//   it('should have a parent div with a .row class', () => {
//     expect(wrapper.find('.row').length).to.equal(1);
//   });
//   it('should have a div with a .card class', () => {
//     expect(wrapper.find('.card').length).to.equal(1);
//   });
//   it('should have a div with a .card-image class', () => {
//     expect(wrapper.find('.card-image').length).to.equal(1);
//   });
//   it('should have a div with a .card-content class', () => {
//     expect(wrapper.find('.card-content').length).to.equal(1);
//   });
//   it('should have a div with a .card-action class', () => {
//     expect(wrapper.find('.card-action').length).to.equal(1);
//   });
//   it('should have a div with a .card-panel class', () => {
//     expect(wrapper.find('.card-panel').length).to.equal(1);
//   });
// });
