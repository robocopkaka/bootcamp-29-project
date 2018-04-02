// container component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as centerActions from '../../../actions/centerActions';
import CenterList from '../presentational/CenterList';
import Search from '../../common/Search';
import Preloader from '../../common/Preloader';

export class Centers extends Component {
  componentDidMount() {
    if (this.props.centers.length === 0) {
      this.props.centerActions.fetchCenters();
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (this.props.centers.length !== nextProps.centers.length) {
  //     this.props.centers = nextProps.centers;
  //   }
  // }
  render() {
    const { isAdmin = false } = this.props;
    const { centers = [] } = this.props;
    if (this.props.isLoading) {
      return (
        <Preloader />
      );
    } else if (this.props.centers.length === 0) {
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
  message: PropTypes.string
};

Centers.defaultProps = {
  centers: [],
  isLoading: false,
  message: ''
};

function mapStateToProps(state) {
  return {
    centers: state.centers.centers,
    isAdmin: state.session.isAdmin,
    isLoading: state.centers.isLoading,
    message: state.centers.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Centers);
