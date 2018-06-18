import React from 'react';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
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
});
