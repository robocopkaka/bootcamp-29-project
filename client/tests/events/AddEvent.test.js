import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import configureStore from 'redux-mock-store';
import ConnectedAddEvent, { AddEvent } from '../../components/events/container/AddEvent';

configure({ adapter: new Adapter() });

describe('<AddEvent />', () => {
  let wrapper;
  const actions = {
    fetchCenters: () => {}
  };
  let store, container;
  const mockStore = configureStore();
  const initialState = {};
  beforeEach(() => {
    wrapper = shallow(<AddEvent
      actions={actions}
      SelectField={SelectField}
      MenuItem={MenuItem}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedAddEvent store={store} />);
  });
  it('should have two divs with a .max-width-six-hundred class', () => {
    expect(wrapper.find('.max-width-six-hundred').length).to.equal(1);
  });
  it('should have a h3 element with text matching - Add an Event', () => {
    expect(wrapper.find('h3').text()).to.equal('Add an Event');
  });
  it('should render the connected component', () => {
    expect(container.length).to.equal(1);
  });
});
