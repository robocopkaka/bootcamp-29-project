import { expect } from 'chai';
import utilityReducer from '../../reducers/utilityReducer';
import initialState from '../../reducers/initialState';
import * as types from '../../actions/actionTypes';

describe('utilityReducer', () => {
  it('should return the default state', () => {
    expect(utilityReducer(
      initialState.componentName,
      {}
    )).to.deep.equal(initialState.componentName);
  });
  it('should handle SET_COMPONENT_NAME_SUCCESS', () => {
    let state = initialState.componentName;
    const name = 'kachi';
    state = name;
    expect(utilityReducer(initialState.componentName, {
      type: types.SET_COMPONENT_NAME_SUCCESS,
      name
    })).to.deep.equal(state);
  });
});
