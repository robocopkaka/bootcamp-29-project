import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../components/common/Footer';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });
  it('should have a div with a .container class', () => {
    expect(wrapper.find('.container').length).to.equal(1);
  });
  it('should have a div with a .row class inside the div with a container class', () => {
    expect(wrapper.find('.container').children().find('.row').length).to.equal(1);
  });
  it('should have two divs inside the div with a .row class', () => {
    expect(wrapper.find('.container').find('.row').children().length).to.equal(2);
  });
  it('should have a child with a h5 tag saying EventManager in the first div child of the .row div', () => {
    expect(wrapper.find('.container').find('.row')
      .find('.col .l6 .s12')
      .children()
      .find('h5')
      .text()).to.equal('EventManager');
  });
  it('should have a child with a p tag saying \'Find centers for your events\' in the first div child of the .row div', () => {
    expect(wrapper.find('.container').find('.row')
      .first()
      .find('p')
      .at(0)
      .text()).to.equal('Find centers for your events');
  });
  it('should have a child with a h5 tag saying \'Useful links\' in the second div child of the .row div', () => {
    expect(wrapper.find('.container').find('.row').find('.l4')
      .children('h5')
      .text()).to.equal('Useful links');
  });
  it('should have a ul element in the second div child of the .row div', () => {
    expect(wrapper.find('.container').find('.row').find('.l4')
      .find('ul')
      .length).to.equal(1);
  });
  it('should have two li elements in the ul element inside the second div child of the .row div', () => {
    expect(wrapper.find('.container').find('.row').find('.l4')
      .find('ul')
      .children()
      .length).to.equal(2);
  });
  it('should have the text in the first li element in the ul element inside the second div child of the .row div have a text matching \'All Events\'', () => {
    expect(wrapper.find('.container').find('.row').find('.l4')
      .find('ul')
      .children('li')
      .at(0)
      .text()).to.equal('All Events');
  });
  it('should have the text in the second li element in the ul element inside the second div child of the .row div have a text matching \'All Centers\'', () => {
    expect(wrapper.find('.container').find('.row').find('.l4')
      .find('ul')
      .children('li')
      .at(1)
      .text()).to.equal('All Centers');
  });
});
