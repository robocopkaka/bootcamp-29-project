import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import ConnectedCenters, { Centers } from '../components/centers/containers/Centers';
// import CenterList from '../components/centers/presentational/CenterList';
// import Search from '../components/common/Search';

configure({ adapter: new Adapter() });

describe('<Centers />', () => {
  let wrapper;
  let wrapperWithProps;
  const centers = [];
  const isAdmin = true;
  const isLoading = false;
  const message = '';
  const centerActions = {
    fetchCenters: () => {}
  };
  const location = {
    search: {
      page: 1
    }
  };
  const loadedCenters = [
    {
      id: 1,
      name: 'kachi',
      state: 'state',
      address: 'address',
      capacity: 100,
      chairs: 10,
      projector: 1,
      image: 'lakc',
      detail: 'jgekj'
    }
  ];
  const initialState = {
    centers: {
      centers: loadedCenters,
      meta: {
        pagination: {
          pages: 1
        }
      }
    },
    session: {
      isAdmin: true
    }
  };
  const mockStore = configureStore();
  let store, container;
  beforeEach(() => {
    wrapper = shallow(<Centers
      centers={centers}
      isAdmin={isAdmin}
      isLoading={isLoading}
      message={message}
      centerActions={centerActions}
      location={location}
    />);
    wrapperWithProps = shallow(<Centers
      centers={loadedCenters}
      isAdmin={isAdmin}
      isLoading={isLoading}
      message={message}
      centerActions={centerActions}
      location={location}
    />);
    store = mockStore(initialState);
    container = shallow(<ConnectedCenters store={store} />);
  });
  // it('should have a CenterList component in it', () => {
  //   expect(wrapper.find(CenterList).length).toBe(1);
  // });
  // it('should have a Search component in it', () => {
  //   expect(wrapper.find(Search).length).toBe(1);
  // });
  it('should render a div with a simple text if no centers are in props', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
    expect(wrapper.find('div').text()).toEqual('Sorry no centers found');
  });
  it('should have four divs if there are centers in props', () => {
    const divs = wrapperWithProps.find('div');
    expect(divs.length).toEqual(4);
  });
  it('should have a button if there are centers in props', () => {
    const buttons = wrapperWithProps.find('button');
    expect(buttons.length).toEqual(1);
  });
  it('should render the connected component', () => {
    expect(container.length).toEqual(1);
  });
  it('should have the same props with the values in initialState', () => {
    expect(container.prop('centers')).toEqual(initialState.centers.centers);
    expect(container.prop('isAdmin')).toEqual(initialState.session.isAdmin);
    expect(container.prop('pages')).toEqual(initialState.centers.meta.pagination.pages);
  });
});
