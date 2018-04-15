import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedSignup, { Signup } from '../components/common/Signup';

configure({ adapter: new Adapter() });


describe('<Signup />', () => {
  let wrapper;
  let store, container;
  const isLoading = false;
  const initialState = {
    register: {
      isLoading: false
    }
  };
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<Signup
      isLoading={isLoading}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedSignup store={store} />);
  });
  it('should have five input elements', () => {
    expect(wrapper.find('input')).toHaveLength(5);
  });
  it('should have a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should have a a signup-form div', () => {
    const divs = wrapper.find('.signup-form');
    expect(divs.length).to.equal(1);
  });
  it('should render a connected component', () => {
    expect(container.length).to.equal(1);
  });
  it('should have props in the container match those in initial state', () => {
    expect(container.prop('isLoading')).to.equal(initialState.register.isLoading);
  });
});
