// import React from 'react';
// import { shallow, configure, mount } from 'enzyme';
// import { expect } from 'chai';
// import Adapter from 'enzyme-adapter-react-16';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import PropTypes from 'prop-types';
// import { AddEvent } from '../../components/events/container/AddEvent';
// import EventsForm from '../../components/events/presentational/EventsForm';
//
// configure({ adapter: new Adapter() });
//
// describe('<AddEvent />', () => {
//   let wrapper;
//   const centers = [];
//   const actions = {
//     fetchCenters: () => {}
//   };
//   const muiTheme = getMuiTheme();
//   beforeEach(() => {
//     wrapper = mount(<AddEvent
//       centers={centers}
//       actions={actions}
//       SelectField={SelectField}
//       MenuItem={MenuItem}
//     />, {
//       context: { muiTheme },
//       childContextTypes: { muiTheme: PropTypes.object }
//     });
//   });
//   // it('should have two divs with a .container class', () => {
//   //   expect(wrapper.find('.container').length).to.equal(2);
//   // });
//   // it('should have a div with a .card class', () => {
//   //   expect(wrapper.find('.card').length).to.equal(1);
//   // });
//   // it('should have a button', () => {
//   //   expect(wrapper.find('button').length).to.equal(1);
//   // });
//   // it('should have a form', () => {
//   //   expect(wrapper.find('form').length).to.equal(1);
//   // });
//   it('should render the events form', () => {
//     console.log('wrapper');
//     expect(wrapper.find(EventsForm)).to.equal(1);
//   });
// });
