import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditCenter } from '../../components/centers/containers/EditCenter';

configure({ adapter: new Adapter() });

describe('<EditCenter />', () => {
  let wrapper;
  const center = {};
  const actions = {
    fetchSingleCenter: () => {}
  };
  const match = {
    params: {
      id: 0
    }
  };
  beforeEach(() => {
    wrapper = shallow(<EditCenter
      center={center}
      actions={actions}
      match={match}
    />);
  });
  it('should have a method that handles change to each input element', () => {
    expect(wrapper.instance().handleChange).toBeDefined();
  });
  it('should have a method that checks if the fields in the form are valid', () => {
    expect(wrapper.instance().formIsValid).toBeDefined();
  });
  it('should have a method that resets validation states', () => {
    expect(wrapper.instance().resetValidationStates).toBeDefined();
  });
  it('should have a method that gets a signed request from S3', () => {
    expect(wrapper.instance().getSignedRequest).toBeDefined();
  });
  it('should have a method that uploads a file to S3', () => {
    expect(wrapper.instance().uploadFile).toBeDefined();
  });
  it('should have a method for updating a center', () => {
    expect(wrapper.instance().updateCenter).toBeDefined();
  });
});
