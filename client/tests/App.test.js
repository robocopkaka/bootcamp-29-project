import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
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
    expect(wrapper.find(Header).length).to.equal(1);
  });
  it('should have a Footer component', () => {
    expect(wrapper.find(Footer).length).to.equal(1);
  });
  it('should have a Modal component', () => {
    expect(wrapper.find(Modal).length).to.equal(1);
  });
  it('should have a Main component', () => {
    expect(wrapper.find(Main).length).to.equal(1);
  });
});
