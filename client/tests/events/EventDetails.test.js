import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import EventDetails from '../../components/events/presentational/EventDetails';

configure({ adapter: new Adapter() });

describe('<EventDetails />', () => {
  let wrapper;
  const event = {};
  const center = {};
  beforeEach(() => {
    wrapper = shallow(<EventDetails
      center={center}
      event={event}
    />);
  });
  it('should have a div with a .row class', () => {
    expect(wrapper.find('.row').length).to.equal(1);
  });
  it('should have a card', () => {
    expect(wrapper.find('.card').length).to.equal(1);
  });
  it('should have a card with two child divs', () => {
    expect(wrapper.find('.card').children().length).to.equal(2);
  });
});
