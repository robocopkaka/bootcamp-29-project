import React from 'react';
import { mount, configure } from 'enzyme';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jQuery from 'jquery';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../components/Main';
import { Home } from '../components/Home';
import { Centers } from '../components/centers/containers/Centers';
import { SingleCenter } from '../components/centers/containers/SingleCenter';
import events from './fixtures/events';

configure({ adapter: new Adapter() });

describe('<Main />', () => {
  let wrapper, store;
  const initialState = {
    session: {
      isAdmin: false
    },
    centers: {
      meta: {
        pagination: {
          pages: 1
        }
      },
      center: {}
    },
    events: {
      events,
      meta: {
        pagination: {
          pages: 1
        }
      },
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares, browserHistory);
  let div;
  beforeEach(() => {
    window.$ = jQuery;
    store = mockStore(initialState);
  });
  it('should display the home component when the user navigates to /', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>);
    expect(wrapper.find(Home)).to.have.length(1);
  });
  it('should display the Centers component when the user navigates to /centers', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/centers']} initialIndex={0}>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>);
    expect(wrapper.find(Centers)).to.have.length(1);
  });
  it('should display the SingleCenter component when the user navigates to /centers/:id', () => {
    const onCloseMock = jest.fn();
    global.$ = () => ({
      on: onCloseMock,
    });
    div = global.document.createElement('div');
    global.document.body.appendChild(div);
    wrapper = mount(
      <MemoryRouter initialEntries={['/centers/1']} initialIndex={0}>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>, { attachTo: div });
    expect(wrapper.find(SingleCenter)).to.have.length(1);
  });
});
