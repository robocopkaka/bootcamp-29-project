// import React from 'react';
// import { shallow, configure } from 'enzyme';
// import { expect } from 'chai';
// import Adapter from 'enzyme-adapter-react-16';
// import CenterList from '../components/CenterList';
//
// configure({ adapter: new Adapter() });
//
// describe('<Centers />', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<CenterList />);
//   });
//   it('should have a div with a .container class', () => {
//     expect(wrapper.find('.container').length).to.equal(1);
//   });
//   it('should have a div with a .card class', () => {
//     expect(wrapper.find('.card').length).to.equal(1);
//   });
//   it('should have three divs inside the .card div', () => {
//     expect(wrapper.find('.card').children().length).to.equal(3);
//   });
// });
