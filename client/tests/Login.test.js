import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedLogin, { Login } from '../components/common/Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let wrapper;
  const isLoading = false;
  const initialState = {
    session: {
      isLoading: false
    }
  };
  let store, container;
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<Login
      isLoading={isLoading}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedLogin store={store} />);
  });
  it('should have two input elements', () => {
    expect(wrapper.find('input').length).toBe(2);
  });
  it('should have a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should have a method that logins a user', () => {
    expect(wrapper.instance().login).toBeDefined();
  });
  it('should have a method that validates a form', () => {
    expect(wrapper.instance().formIsValid()).toBeDefined();
  });
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the connected component as in initialState', () => {
    expect(container.prop('isLoading')).toEqual(initialState.session.isLoading);
  });
});
