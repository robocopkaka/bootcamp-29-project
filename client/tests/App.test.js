import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/App';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Main from '../components/Main';
import Modal from '../components/common/Modal';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('should have a Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });
  it('should have a Footer component', () => {
    expect(wrapper.find(Footer).length).toBe(1);
  });
  it('should have a Modal component', () => {
    expect(wrapper.find(Modal).length).toBe(1);
  });
  it('should have a Main component', () => {
    expect(wrapper.find(Main).length).toBe(1);
  });

  describe('instance methods', () => {
    it('should toggle show in state', () => {
      const instance = wrapper.instance();
      instance.showModal();
      expect(instance.state.show).toBe(true);
    });
    it('should toggle signupMode in state', () => {
      const instance = wrapper.instance();
      instance.toggleSignup();
      expect(instance.state.signupMode).toBe(true);
    });
    it('should hideModal', () => {
      const instance = wrapper.instance();
      instance.showModal();
      instance.toggleSignup();
      instance.hideModal();
      expect(instance.state.show).toBe(false);
      expect(instance.state.signupMode).toBe(false);
    });
  });
});
