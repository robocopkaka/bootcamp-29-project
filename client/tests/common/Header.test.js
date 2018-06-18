import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedHeader, { Header } from '../../components/common/Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let wrapper, wrapperLoggedIn, adminWrapper;
  let store, container;
  const mockStore = configureStore();
  const loggedIn = false;
  const loggedInUser = true;
  const isAdmin = false;
  const admin = true;
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
    adminWrapper = shallow(<Header
      loggedIn={loggedInUser}
      isAdmin={admin}
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
  it('should render the connected component', () => {
    expect(container.length).toBe(1);
  });
  it('should have the same props in the connected component as in initialState', () => {
    expect(container.prop('loggedIn')).toEqual(initialState.session.jwt);
    expect(container.prop('isAdmin')).toEqual(initialState.session.isAdmin);
  });

  describe('method interactions', () => {
    const actions = {
      logOutUser: jest.fn().mockImplementation(() => Promise.resolve())
    };
    it('should call the logout method onClick', () => {
      const spy = jest.spyOn(Header.prototype, 'logOut');
      const wrapperWithSpy = shallow(<Header loggedIn={loggedInUser} actions={actions} />);
      wrapperWithSpy.find('li').children().at(1).simulate('click', { preventDefault() {} });
      expect(Header.prototype.logOut).toHaveBeenCalledTimes(1);
    });
  });
});
