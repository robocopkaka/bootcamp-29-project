import React from 'react';
import { shallow, configure } from 'enzyme';
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
    expect(wrapper.find('.row').length).toBe(1);
  });
  it('should have a card', () => {
    expect(wrapper.find('.card').length).toBe(1);
  });
  it('should have a card with two child divs', () => {
    expect(wrapper.find('.card').children().length).toBe(2);
  });
});
