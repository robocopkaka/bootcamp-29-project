import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SingleCenter } from '../../components/centers/containers/SingleCenter';
import CenterDetail from '../../components/centers/presentational/CenterDetail';
import EventsList from '../../components/events/presentational/EventsList';

configure({ adapter: new Adapter() });

describe('<SingleCenter />', () => {
  let wrapper;
  const center = {};
  const events = [];
  const singleCenterActions = {
    fetchSingleCenter: () => {}
  };
  const match = {
    params: {
      id: 0
    }
  };
  beforeEach(() => {
    wrapper = shallow(<SingleCenter
      center={center}
      events={events}
      singleCenterActions={singleCenterActions}
      match={match}
    />);
  });
  it('should have a CenterDetail component rendered inside it', () => {
    expect(wrapper.find(CenterDetail).length).toBe(1);
  });
  it('should have a EventsList component rendered inside it', () => {
    expect(wrapper.find(EventsList).length).toBe(1);
  });
  it('should have a div with a .container class', () => {
    expect(wrapper.find('.container').length).toBe(1);
  });
});
