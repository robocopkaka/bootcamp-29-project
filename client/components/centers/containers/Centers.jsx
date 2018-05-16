// container component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-materialize';
import qs from 'query-string';
import * as centerActions from '../../../actions/centerActions';
import CenterList from '../presentational/CenterList';
import Search from '../../common/Search';
import Preloader from '../../common/Preloader';
import history from '../../../history';

export class Centers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.changePage = this.changePage.bind(this);
  }
  componentDidMount() {
    const values = qs.parse(this.props.location.search);
    let page;
    if (values.page === undefined) {
      page = 1;
    } else {
      page = parseInt(values.page, 10);
    }
    if (this.props.centers.length === 0) {
      this.props.centerActions.fetchCenters(page);
    }
  }
  changePage(e) {
    this.setState({
      page: e
    });
    this.props.centerActions.fetchCenters(e);
    history.push(`/centers/?page=${e}`);
  }
  render() {
    const { isAdmin = false } = this.props;
    const { centers = [] } = this.props;
    let { pages = 1 } = this.props;
    if (pages >= 9) {
      pages = 9;
    }
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    } else if (centers.length === 0) {
      return (
        <div className="min-height-hundred-vh">
          Sorry no centers found
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="container min-height-hundred-vh">
          <Search />
          <div className="top-ten-padding" />
          <div className="row">
            <CenterList centers={centers} isAdmin={isAdmin} />
          </div>
          { pages !== 1 ? (
            <Pagination
              items={9}
              activePage={this.state.page}
              onSelect={this.changePage}
              maxButtons={pages}
            />
          ) : ''}
        </div>
        <div className="fixed-action-btn horizontal click-to-toggle">
          <Link
            to="/add-center"
            className="btn-floating btn-large red white-color"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

Centers.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object),
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  pages: PropTypes.number
};

Centers.defaultProps = {
  centers: [],
  isLoading: false,
  pages: 1
};

function mapStateToProps(state) {
  return {
    centers: state.centers.centers,
    isAdmin: state.session.isAdmin,
    isLoading: state.centers.isLoading,
    message: state.centers.message,
    pages: state.centers.meta.pagination.pages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Centers);
