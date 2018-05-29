import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedHeader, { Header } from '../components/common/Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let wrapper, wrapperLoggedIn;
  let store, container;
  const mockStore = configureStore();
  const loggedIn = false;
  const loggedInUser = true;
  const isAdmin = false;
  const initialState = {
    session: {
      jwt: true,
      isAdmin: true
    }
  };
  beforeEach(() => {
    wrapper = shallow(<Header
      loggedIn={loggedIn}
      isAdmin={isAdmin}
    />);
    wrapperLoggedIn = shallow(<Header
      loggedIn={loggedInUser}
      isAdmin={isAdmin}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedHeader store={store} />);
  });
  it('should have a nav element', () => {
    expect(wrapper.find('nav').length).toBe(1);
  });
  it('should have an unordered list in the nav element with an ID - nav-mobile', () => {
    expect(wrapper.find('nav').children().find('#nav-mobile').length).toBe(1);
  });
  it('should have four list elements in the unordered list with ID nav-mobile', () => {
    expect(wrapper.find('nav').children().find('#nav-mobile').children().length).toBe(4);
  });
  it('should have an unordered list in the nav element with a class - side-nav', () => {
    expect(wrapper.find('nav').children().find('.side-nav').length).toBe(1);
  });
  it('should have four list elements in the unordered list with class side-nav', () => {
    expect(wrapper.find('nav').children().find('.side-nav').children().length).toBe(4);
  });
  it('should have an unordered list inside a list element in the unordered list with a .side-nav class', () => {
    expect(wrapper.find('nav').children().find('.side-nav').children()
      .find('.left-padding')
      .children().length).toBe(1);
  });
  it('should have profile and logout links if the user is logged in', () => {
    expect(wrapperLoggedIn.find('Link').children().first().text()).toEqual('Profile');
    expect(wrapperLoggedIn.find('li').at(1).children().text()).toEqual('Logout');
  });
  it('should have login and signup links if the user is not logged in', () => {
    expect(wrapper.find('li').children().first().text()).toEqual('Login');
    expect(wrapper.find('li').at(1).children().text()).toEqual('Signup');
  });
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the connected component as in initialState', () => {
    expect(container.prop('loggedIn')).toEqual(initialState.session.jwt);
    expect(container.prop('isAdmin')).toEqual(initialState.session.isAdmin);
  });
});
