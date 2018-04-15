import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventsListWithImage from '../../components/events/presentational/EventsListWithImage';
import events from '../fixtures/events';
import * as styles from '../../css/events.module.css';

configure({ adapter: new Adapter() });

describe('<EventsListWithImage />', () => {
  let wrapper;
  const isAdmin = false;
  const isLoading = false;
  const deleteEvent = () => {};
  beforeEach(() => {
    wrapper = shallow(<EventsListWithImage
      events={events}
      isAdmin={isAdmin}
      isLoading={isLoading}
      deleteEvent={deleteEvent}
    />);
  });
  it('should have three cards', () => {
    expect(wrapper.find('.card').length).toBe(3);
  });
  it('should have three cards with a .card-image class in them', () => {
    expect(wrapper.find('.card-image').length).toBe(3);
  });
  it('should have three cards with a .card-content class in them', () => {
    expect(wrapper.find('.card-content').length).toBe(3);
  });
  it('should have three cards with a .card-action class', () => {
    expect(wrapper.find('.card-action').length).toBe(3);
  });
});
