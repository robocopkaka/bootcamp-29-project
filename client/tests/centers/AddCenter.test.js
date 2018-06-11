import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import expect from 'expect';
import configureStore from 'redux-mock-store';
import '../../../__mocks__/xhr-mock';
import ConnectedAddCenter, { AddCenter } from '../../components/centers/containers/AddCenter';
import CentersForm from '../../components/centers/presentational/CentersForm';
import Preloader from '../../components/common/Preloader';
// import centers from '../fixtures/centers';

configure({ adapter: new Adapter() });

describe('<AddCenter />', () => {
  let wrapper, loadingWrapper;
  const isLoading = false;
  const loading = true;
  const centerActions = {
    centersLoading: jest.fn().mockImplementation(() => Promise.resolve()),
    addCenter: jest.fn().mockImplementation(() => Promise.resolve())
  };
  const initialState = {
    centers: {
      isLoading: false
    }
  };
  let store, container;
  const mockStore = configureStore();
  beforeEach(() => {
    wrapper = shallow(<AddCenter
      isLoading={isLoading}
      centerActions={centerActions}
    />);
    loadingWrapper = shallow(<AddCenter
      isLoading={loading}
      centerActions={centerActions}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedAddCenter
      store={store}
      isLoading={isLoading}
      centerActions={centerActions}
    />);
  });
  it('should have two divs with a .container class', () => {
    expect(wrapper.find('.container').length).toBe(2);
  });
  it('should have text matching -Add a Center, in the second container', () => {
    expect(wrapper.find('.container').at(1).children('h3').text()).toBe('Add a Center');
  });
  it('should have a method that checks if the fields in the form are valid', () => {
    expect(wrapper.instance().formIsValid).toBeDefined();
  });
  it('should have a method that resets validation states', () => {
    expect(wrapper.instance().resetValidationStates).toBeDefined();
  });
  it('should render a CentersForm component', () => {
    expect(wrapper.find(CentersForm).length).toBe(1);
  });
  it('should have a method that handles change to each input element', () => {
    expect(wrapper.instance().handleChange).toBeDefined();
  });
  it('should have a method that gets a signed request from S3', () => {
    expect(wrapper.instance().getSignedRequest).toBeDefined();
  });
  it('should have a method that uploads a file to S3', () => {
    expect(wrapper.instance().uploadFile).toBeDefined();
  });
  it('should have a circular loader if isLoading is true', () => {
    expect(loadingWrapper.find(Preloader).length).toBe(1);
  });

  describe('handle change methods', () => {
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
      const spy = jest.spyOn(AddCenter.prototype, 'getSignedRequest');
      const instance = wrapper.instance();
      instance.getSignedRequest('file');
      expect(AddCenter.prototype.getSignedRequest).toHaveBeenCalledTimes(1);
    });
    it('should upload file', () => {
      const spy = jest.spyOn(AddCenter.prototype, 'uploadFile');
      const instance = wrapper.instance();
      instance.uploadFile('file', 'request', 'url');
      expect(AddCenter.prototype.uploadFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('container component', () => {
    it('return the container component', () => {
      expect(container.length).toBe(1);
    });
    it('should have the same props in the container component as in initialState', () => {
      expect(container.prop('isLoading')).toEqual(initialState.centers.isLoading);
    });
  });

  describe('addCenter', () => {
    it('should add a center on button click', () => {
      const dispatchActions = {
        addCenter: jest.fn().mockImplementation(() => Promise.resolve()),
        centersLoading: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const getSignedRequest = jest.fn().mockImplementation(() => Promise.resolve());
      const hideModal = jest.fn().mockImplementation(() => Promise.resolve());
      const spy = jest.spyOn(AddCenter.prototype, 'addCenter');
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <AddCenter
            centerActions={dispatchActions}
            someActionProp={spy}
            hideModal={hideModal}
            getSignedRequest={getSignedRequest}
          />
        </Provider>);
      wrapperWithSpy.find('button').simulate('click', { preventDefault() {} });
      expect(AddCenter.prototype.addCenter).toHaveBeenCalledTimes(1);
      // console.log(wrapperWithSpy.debug());
    });
    it('should add center directly', () => {
      const spy = jest.spyOn(AddCenter.prototype, 'addCenter');
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
      instance.addCenter({ preventDefault() {} });
      expect(AddCenter.prototype.addCenter).toHaveBeenCalledTimes(2);
    });
  });
});
