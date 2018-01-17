import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../components/App.jsx';
import styles from '../components/styles.module.css';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('has a single wrapper element', () => {
    expect(wrapper.find(`.${styles.wrapper}`))
      .to.have.length(1);
  });
});
