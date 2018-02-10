import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import EventsList from '../../components/events/EventsList';

configure({ adapter: new Adapter() });

describe('<EventsList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventsList />);
  });
  it('should have a parent div with a .row class', () => {
    expect(wrapper.find('.row').length).to.equal(1);
  });
  it('should have a span with a .date class', () => {
    expect(wrapper.find('.date').length).to.equal(1);
  });
  it('should have a div with a .card-panel class', () => {
    expect(wrapper.find('.card-panel').length).to.equal(1);
  });
});
