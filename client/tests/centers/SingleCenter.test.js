import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedSingleCenter, { SingleCenter } from '../../components/centers/containers/SingleCenter';
import Modal from '../../components/common/Modal';
import EventsListWithImage from '../../components/events/presentational/EventsListWithImage';
import CenterDetail from '../../components/centers/presentational/CenterDetail';
import events from '../fixtures/events';
import center from '../fixtures/center';
// import * as indexStyles from '../../css/index.module.css';

configure({ adapter: new Adapter() });

describe('<SingleCenter />', () => {
  let wrapper;
  const emptyEvents = [];
  const actions = {
    fetchSingleCenter: () => {},
    fetchEventsInCenter: () => {}
  };
  const match = {
    params: {
      id: 0
    }
  };
  const initialState = {
    events: {
      events,
      meta: {
        pagination: {
          pages: 1
        }
      }
    },
    centers: {
      center
    },
    session: {
      isAdmin: true
    }
  };
  let store, container;
  const mockStore = configureStore();
  store = mockStore(initialState);
  beforeEach(() => {
    wrapper = shallow(
      <SingleCenter
        center={center}
        events={emptyEvents}
        actions={actions}
        match={match}
      />);
    container = shallow(<ConnectedSingleCenter store={store} />);
  });
  // it('should have a div with a .min-height-hundred-vh class', () => {
  //   // (`${indexStyles['min-height-hundred-vh']}`
  //   // expect(wrapper.find(`${indexStyles['min-height-hundred-vh']}`).length).to.equal(1);
  //   expect(wrapper.find('div').first().hasClass(`${indexStyles['min-height-hundred-vh']}`)).to.equal(true);
  // });
  // it('should have 5 child divs inisde the parent div', () => {
  //   const divs = wrapper.find(`${indexStyles['min-height-hundred-vh']}`).children();
  //   expect(divs.length).to.equal(5);
  // });
  it('should render the Modal component', () => {
    expect(wrapper.find(Modal).length).to.equal(1);
  });
  it('should render the CenterDetail component', () => {
    expect(wrapper.find(CenterDetail).length).to.equal(1);
  });
  it('should render a connected component', () => {
    expect(container.length).to.equal(1);
    console.log(wrapper.debug())
  });
  it('should have the same props in the container as in initialState', () => {
    expect(container.prop('events')).to.equal(initialState.events.events);
    expect(container.prop('pages')).to.equal(initialState.events.meta.pagination.pages);
    expect(container.prop('center')).to.equal(initialState.centers.center);
    expect(container.prop('isAdmin')).to.equal(initialState.session.isAdmin);
  });
});
