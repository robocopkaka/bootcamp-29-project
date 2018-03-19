// import React from 'react';
// import { mount, configure } from 'enzyme';
// import { expect } from 'chai';
// import Adapter from 'enzyme-adapter-react-16';
// import Events from '../../components/events/Events';
// import EventsListWithImage from '../../components/events/EventsListWithImage';
// import Search from '../../components/Search';
//
// configure({ adapter: new Adapter() });
//
// describe('<Events />', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(<Events />);
//   });
//   it('should have a parent div with a .container class', () => {
//     expect(wrapper.find('.container').length).to.equal();
//   });
//   it('should render a Search component', () => {
//     expect(wrapper.find(Search).length).to.equal(1);
//   });
//   it('should have an EventsListWithImage component', () => {
//     expect(wrapper.find(EventsListWithImage).length).to.equal(1);
//   });
// });
