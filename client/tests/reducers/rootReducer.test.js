import { createStore } from 'redux';
import { expect } from 'chai';
import rootReducer from '../../reducers/rootReducer';
import eventReducer from '../../reducers/eventReducer';

describe('root reducer', () => {
  it('creates a store', () => {
    const store = createStore(rootReducer);
    expect(store.getState().events).to.equal(eventReducer(undefined, {}));
  });
});
