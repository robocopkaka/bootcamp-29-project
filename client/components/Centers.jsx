// container component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as centerActions from '../actions/centerActions';
import CenterList from './CenterList';
import Search from './Search';

class Centers extends Component {
  componentWillMount() {
    if (this.props.centers.length === 0) {
      this.props.centerActions.fetchCenters();
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <Search />
          <div className="top-ten-padding" />
          <div className="row">
            <CenterList centers={this.props.centers} />
          </div>
        </div>
      </div>
    );
  }
}

Centers.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  centerActions: PropTypes.objectOf(PropTypes.func).isRequired
};

function mapStateToProps(state) {
  return {
    centers: state.centers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    centerActions: bindActionCreators(centerActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Centers);
