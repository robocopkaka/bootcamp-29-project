import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Centers } from '../components/centers/containers/Centers';
import CenterList from '../components/centers/presentational/CenterList';
import Search from '../components/common/Search';

configure({ adapter: new Adapter() });

describe('<Centers />', () => {
  let wrapper;
  const centers = [];
  const isAdmin = false;
  const isLoading = false;
  const message = '';
  const centerActions = {
    fetchCenters: () => {}
  };
  beforeEach(() => {
    wrapper = shallow(<Centers
      centers={centers}
      isAdmin={isAdmin}
      isLoading={isLoading}
      message={message}
      centerActions={centerActions}
    />);
  });
  it('should have a CenterList component in it', () => {
    expect(wrapper.find(CenterList).length).to.equal(1);
  });
  it('should have a Search component in it', () => {
    expect(wrapper.find(Search).length).to.equal(1);
  });
});
