import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import * as actions from '../../actions/utilityActions';
import * as types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('utility actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch SET_COMPONENT_NAME_SUCCESS if a component name is set successfully', () => {
    const name = 'kachi';
    const expectedActions = [
      { type: types.SET_COMPONENT_NAME_SUCCESS, name }
    ];
    const store = mockStore({ utility: {} });

    return store.dispatch(actions.setComponentName(name)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
  it('should dispatch SET_COMPONENT_NAME_SUCCESS if a component name is set successfully without a name passed in', () => {
    const name = '';
    const expectedActions = [
      { type: types.SET_COMPONENT_NAME_SUCCESS, name }
    ];
    const store = mockStore({ utility: {} });

    return store.dispatch(actions.setComponentName()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
