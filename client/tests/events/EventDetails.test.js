import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventDetails from '../../components/events/presentational/EventDetails';
import event from '../fixtures/event';

configure({ adapter: new Adapter() });

describe('<EventDetails />', () => {
  let wrapper;
  const center = {};
  beforeEach(() => {
    wrapper = shallow(<EventDetails
      center={center}
      event={event}
    />);
  });
  it('should have a parent div with a .single-event-container class', () => {
    expect(wrapper.find('.single-event-container').length).to.equal(1);
  });
  it('should have an image', () => {
    expect(wrapper.find('img').length).to.equal(1);
  });
  it('should have two child divs inside the parent div', () => {
    const divs = wrapper.find('.single-event-container').children();
    expect(divs.length).to.equal(2);
  });
  it('should have a h1 tag with text matching the name value in the event prop', () => {
    expect(wrapper.find('h1').text()).to.equal(event.name);
  });
});
