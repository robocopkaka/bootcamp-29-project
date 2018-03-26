import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Events } from '../../components/events/container/Events';
import EventsListWithImage from '../../components/events/presentational/EventsListWithImage';
import Search from '../../components/common/Search';
import events from '../fixtures/events';

configure({ adapter: new Adapter() });

describe('<Events />', () => {
  let wrapper;
  const events = [];
  const isAdmin = false;
  const isLoading = false;
  const message = '';
  const actions = {
    fetchEvents: () => {}
  };
  beforeEach(() => {
    wrapper = shallow(<Events
      events={events}
      isAdmin={isAdmin}
      isLoading={isLoading}
      message={message}
      actions={actions}
    />);
  });
  it('should have a parent div with a .container class', () => {
    expect(wrapper.find('.container').length).to.equal(1);
  });
  it('should render a Search component', () => {
    expect(wrapper.find(Search).length).to.equal(1);
  });
  it('should have an EventsListWithImage component', () => {
    expect(wrapper.find(EventsListWithImage).length).to.equal(1);
  });
});
describe('Should render a list of events', () => {
  let wrapper;
  const isAdmin = false;
  const deleteEvent = () => {};
  beforeEach(() => {
    wrapper = shallow(<EventsListWithImage
      events={events}
      isAdmin={isAdmin}
      deleteEvent={deleteEvent}
    />);
  });
  it('should render 3 events', () => {
    expect(wrapper.children().length).to.equal(3);
  });
});
