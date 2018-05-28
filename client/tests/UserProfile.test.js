import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { UserProfile } from '../components/Profiles/UserProfile';
import events from './fixtures/events';

configure({ adapter: new Adapter() });

describe('<UserProfile />', () => {
  let wrapper;
  const userId = 1;
  const loggedIn = true;
  const isLoading = false;
  const initialState = {
    events: {
      events,
      isLoading: false
    },
    session: {
      userId: 1,
      loggedIn: true
    }
  };
  beforeEach(() => {
    wrapper = shallow(<UserProfile
      isLoading={isLoading}
      loggedIn={loggedIn}
      userId={userId}
      events={events}
    />);
  });
  it('should have a div with an all-events ID', () => {
    expect(wrapper.find('#all-events').length).to.equal(1);
  });
});
