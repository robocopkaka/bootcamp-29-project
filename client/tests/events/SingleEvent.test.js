import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SingleEvent } from '../../components/events/container/SingleEvent';
import EventDetails from '../../components/events/presentational/EventDetails';


configure({ adapter: new Adapter() });

describe('<SingleEvent />', () => {
  let wrapper;
  const event = {};
  const actions = {
    fetchSingleEvent: () => {}
  };
  const match = {
    params: {
      id: 0
    }
  };
  beforeEach(() => {
    wrapper = shallow(<SingleEvent
      event={event}
      actions={actions}
      match={match}
    />);
  });
  it('should have a EventDetails component rendered inside it', () => {
    expect(wrapper.find(EventDetails).length).toBe(1);
  });
  it('should have a div with a .show-center-top class', () => {
    expect(wrapper.find('.show-center-top').length).toBe(1);
  });
});
