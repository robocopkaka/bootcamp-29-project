import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventsListWithImage from '../../components/events/presentational/EventsListWithImage';
import events from '../fixtures/events';
import * as styles from '../../css/events.module.css';

configure({ adapter: new Adapter() });

describe('<EventsListWithImage />', () => {
  let wrapper, notAdminWrapper;
  const isAdmin = true;
  const notAdmin = false;
  const isLoading = false;
  const deleteEvent = () => {};
  beforeEach(() => {
    wrapper = shallow(<EventsListWithImage
      events={events}
      isAdmin={isAdmin}
      isLoading={isLoading}
      deleteEvent={deleteEvent}
    />);
    notAdminWrapper = shallow(<EventsListWithImage
      events={events}
      isAdmin={notAdmin}
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
  it('should not find any occurence of a .card-action class if the user is not an admin', () => {
    expect(notAdminWrapper.find('.card-action').length).to.equal(0);
  });
  // fix later
  it('should have the names of the events match the names of the events passed in as props', () => {
    let position = 0;
    wrapper.find(`${styles['event-name']}`).forEach((event) => {
      expect(event.text()).to.equal(events[position].name);
      position += 1;
    });
  });
});
