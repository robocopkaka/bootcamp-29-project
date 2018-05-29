import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CentersForm from '../../components/centers/presentational/CentersForm';

configure({ adapter: new Adapter() });

describe('<CentersForm />', () => {
  let wrapper;
  const nameClasses = '';
  const detailClasses = '';
  const name = {};
  const addressClasses = '';
  const stateClasses = '';
  const capacityClasses = '';
  const chairs = {};
  const projector = {};
  const capacity = {};
  const detail = {};
  const address = {};
  const state = {};
  const image = {};
  const addCenter = () => {
  };
  const handleChange = () => {};
  beforeEach(() => {
    wrapper = shallow(<CentersForm
      nameClasses={nameClasses}
      detailClasses={detailClasses}
      addressClasses={addressClasses}
      stateClasses={stateClasses}
      capacityClasses={capacityClasses}
      saveOrUpdate={addCenter}
      handleChange={handleChange}
      name={name}
      chairs={chairs}
      projector={projector}
      capacity={capacity}
      detail={detail}
      address={address}
      state={state}
      image={image}
      component="Edit"
    />);
  });
  it('should have a form element', () => {
    expect(wrapper.find('form').length).toBe(1);
  });
  it('should have seven divs with .row classes in the form element', () => {
    expect(wrapper.find('form').children().length).toBe(7);
  });
  it('should have an input element with a #center-name ID', () => {
    expect(wrapper.find('#center-name').length).toBe(1);
  });
  it('should have an input element with a #center-address ID', () => {
    expect(wrapper.find('#center-address').length).toBe(1);
  });
  it('should have an input element with a #center-state ID', () => {
    expect(wrapper.find('#center-state').length).toBe(1);
  });
  it('should have an input element with a .file-path-wrapper class', () => {
    expect(wrapper.find('.file-path-wrapper').length).toBe(1);
  });
  it('should have an button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });
});
