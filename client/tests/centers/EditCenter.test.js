import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import expect from 'expect';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import '../../../__mocks__/xhr-mock';
import ConnectedEditCenter, { EditCenter } from '../../components/centers/containers/EditCenter';
import center from '../fixtures/center';

configure({ adapter: new Adapter() });

describe('<EditCenter />', () => {
  let wrapper;
  const actions = {
    fetchSingleCenter: () => {},
    centersLoading: jest.fn().mockImplementation(() => Promise.resolve()),
  };
  const match = {
    params: {
      id: 0
    }
  };
  const initialState = {
    centers: {
      center
    }
  };
  let store, container;
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<EditCenter
      center={center}
      actions={actions}
      match={match}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedEditCenter
      store={store}
      center={center}
      actions={actions}
      match={match}
    />);
  });

  describe('connected component', () => {
    it('should have the connected component', () => {
      expect(container.length).toBe(1);
    });
    it('should have the same props in the container that was passed in from initial state', () => {
      expect(container.prop('center')).toEqual(initialState.centers.center);
    });
  });
  describe('handle change and related methods', () => {
    it('should set name in state when handleChange is called with name', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      expect(instance.state.name.value).toEqual('kachi');
    });
    it('should set image  when handleChange is called with imageUpload', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'imageUpload', files: [{ name: 'kachi' }] } });
      expect(instance.state.image.value).toEqual('kachi');
    });
    it('should clearFields', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      instance.clearFields();
      expect(instance.state.name.value).toEqual('');
    });
    it('should return true if form is valid', () => {
      const instance = wrapper.instance();
      instance.handleChange({ target: { name: 'name', value: 'kachi' } });
      instance.handleChange({ target: { name: 'detail', value: 'kachi' } });
      instance.handleChange({ target: { name: 'address', value: 'kachi' } });
      instance.handleChange({ target: { name: 'state', value: 'kachi' } });
      instance.handleChange({ target: { name: 'capacity', value: '100' } });
      instance.handleChange({ target: { name: 'chairs', value: '100' } });
      instance.handleChange({ target: { name: 'projector', value: '100' } });
      instance.setState({
        image: Object.assign({}, instance.state.image, { value: 'image' })
      });
      expect(instance.formIsValid()).toBe(true);
    });
    it('should return false if form is not valid', () => {
      const instance = wrapper.instance();
      expect(instance.formIsValid()).toBe(false);
    });
    it('should reset validation state', () => {
      const instance = wrapper.instance();
      instance.setState({
        name: Object.assign({}, instance.state.name, { isValid: false })
      });
      instance.setState({
        detail: Object.assign({}, instance.state.detail, { isValid: false })
      });
      instance.resetValidationStates();
      expect(instance.state.name.isValid).toBe(true);
      expect(instance.state.detail.isValid).toBe(true);
    });
  });

  describe('XMLHttpRequest methods', () => {
    it('should get signed request', () => {
      const spy = jest.spyOn(EditCenter.prototype, 'getSignedRequest');
      const instance = wrapper.instance();
      instance.getSignedRequest('file');
      expect(EditCenter.prototype.getSignedRequest).toHaveBeenCalledTimes(1);
    });
    it('should upload file', () => {
      const spy = jest.spyOn(EditCenter.prototype, 'uploadFile');
      const instance = wrapper.instance();
      instance.uploadFile('file', 'request', 'url');
      expect(EditCenter.prototype.uploadFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateCenter', () => {
    it('should add a center on button click', () => {
      const dispatchActions = {
        updateCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        centersLoading: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const hideModal = jest.fn();
      const clearFields = jest.fn();
      const spy = jest.spyOn(EditCenter.prototype, 'updateCenter');
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <EditCenter
            actions={dispatchActions}
            center={center}
            someActionProp={spy}
            hideModal={hideModal}
          />
        </Provider>);
      wrapperWithSpy.find('button').simulate('click', { preventDefault() {} });
      expect(EditCenter.prototype.updateCenter).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentDidMount', () => {
    it('calls componentDidMount', () => {
      const dispatchActions = {
        fetchSingleCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        centersLoading: jest.fn().mockImplementation(() => Promise.resolve()),
      };
      const hideModal = jest.fn();
      // const clearFields = jest.fn();
      const spy = jest.spyOn(EditCenter.prototype, 'componentDidMount');
      const mountedWrapper = mount(
        <Provider store={store}>
          <EditCenter
            actions={dispatchActions}
            center={center}
            someActionProp={spy}
            hideModal={hideModal}
          />
        </Provider>);
      expect(EditCenter.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    });
  });
});
