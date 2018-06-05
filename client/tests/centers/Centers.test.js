import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedCenters, { Centers } from '../../components/centers/containers/Centers';
import CenterList from '../../components/centers/presentational/CenterList';
import Preloader from '../../components/common/Preloader';
import history from '../../history';
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
    search: '?page=2'
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
  it('should have a CenterList component in it', () => {
    expect(wrapperWithProps.find(CenterList).length).toBe(1);
  });
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

  describe('Preloader', () => {
    it('should return a Preloader if isLoading is true', () => {
      const loading = true;
      const loadingWrapper = shallow(<Centers
        centers={loadedCenters}
        isAdmin={isAdmin}
        isLoading={loading}
        message={message}
        centerActions={centerActions}
        location={location}
      />);
      expect(loadingWrapper.find(Preloader).length).toBe(1);
    });
  });

  describe('instance methods', () => {
    it('should change page', () => {
      const spy = jest.spyOn(Centers.prototype, 'changePage');
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const admin = true;
      history.push = jest.fn();
      const wrapperWithSpy = mount(
        <Provider store={store}>
          <Centers
            centers={loadedCenters}
            isAdmin={admin}
            isLoading={isLoading}
            message={message}
            centerActions={dispatchActions}
            location={location}
            pages={9}
          />
        </Provider>);
      // console.log(wrapperWithSpy.debug());
      wrapperWithSpy.find('li').last().simulate('click');
      expect(Centers.prototype.changePage).toHaveBeenCalledTimes(1);
    });
    it('should show modal', () => {
      const instance = wrapper.instance();
      instance.showModal();
      expect(instance.state.show).toBe(true);
    });
    it('should hide modal', () => {
      const instance = wrapper.instance();
      instance.setState({ editMode: true });
      instance.showModal();
      instance.hideModal();
      expect(instance.state.show).toBe(false);
      expect(instance.state.editMode).toBe(false);
    });
    it('should toggleEdit mode', () => {
      const instance = wrapper.instance();
      instance.toggleEdit();
      expect(instance.state.editMode).toBe(true);
    });
    it('should set centerId in state', () => {
      const instance = wrapper.instance();
      instance.changeCenter(1);
      expect(instance.state.centerId).toBe(1);
    });
  });

  describe('componentDidMount', () => {
    it('calls componentDidMount when a page is passed', () => {
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const admin = true;
      const spy = jest.spyOn(Centers.prototype, 'componentDidMount');
      const mountedWrapper = mount(
        <Provider store={store}>
          <Centers
            centers={loadedCenters}
            isAdmin={admin}
            isLoading={isLoading}
            message={message}
            centerActions={dispatchActions}
            location={location}
            pages={9}
          />
        </Provider>);
      expect(Centers.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    });
    it('calls componentDidMount when no page is passed', () => {
      const admin = true;
      const dispatchActions = {
        changePage: jest.fn().mockImplementation(() => Promise.resolve()),
        fetchCenters: jest.fn().mockImplementation(() => Promise.resolve())
      };
      const newLocation = { search: '' };
      const spy = jest.spyOn(Centers.prototype, 'componentDidMount');
      const mountedWrapper = mount(
        <Provider store={store}>
          <Centers
            centers={loadedCenters}
            isAdmin={admin}
            isLoading={isLoading}
            message={message}
            centerActions={dispatchActions}
            location={newLocation}
            pages={9}
          />
        </Provider>);
      expect(Centers.prototype.componentDidMount).toHaveBeenCalledTimes(4);
    });
  });
});
