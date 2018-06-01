// container component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-materialize';
import qs from 'query-string';
import classNames from 'classnames';
import * as centerActions from '../../../actions/centerActions';
import CenterList from '../presentational/CenterList';
import Search from '../../common/Search';
import Preloader from '../../common/Preloader';
import Modal from '../../common/Modal';
import AddCenter from './AddCenter';
import EditCenter from './EditCenter';
import history from '../../../history';
import * as styles from '../../../css/index.module.css';

export class Centers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editMode: false
    };
    this.page = 1;
    this.changePage = this.changePage.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeCenter = this.changeCenter.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  componentDidMount() {
    const values = qs.parse(this.props.location.search);
    if (values.page === undefined) {
      this.page = 1;
    } else {
      this.page = parseInt(values.page, 10);
    }
    if (this.props.centers.length === 0) {
      this.props.centerActions.fetchCenters(this.page);
    }
  }
  changePage(e) {
    this.page = e;
    this.props.centerActions.fetchCenters(e);
    history.push(`/centers/?page=${e}`);
  }
  showModal() {
    this.setState({
      show: true
    });
  }
  hideModal() {
    this.setState({
      show: false,
      editMode: false
    });
  }
  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  changeCenter(centerId) {
    this.setState({
      centerId
    });
  }
  render() {
    const { isAdmin = false } = this.props;
    const { centers = [] } = this.props;
    const whiteColorClasses = classNames('btn-floating', 'btn-large', 'red', styles['white-color']);
    const containerClasses = classNames('container', styles['min-height-hundred-vh'])
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
        <div className={styles['min-height-hundred-vh']}>
          Sorry no centers found
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className={containerClasses}>
          <Search />
          <div className={styles['top-ten-padding']} />
          <div className="row">
            <CenterList
              centers={centers}
              isAdmin={isAdmin}
              toggleEdit={this.toggleEdit}
              changeCenter={this.changeCenter}
              showModal={this.showModal}
            />
          </div>
          { pages !== 1 ? (
            <Pagination
              items={9}
              activePage={this.page}
              onSelect={this.changePage}
              maxButtons={pages}
            />
          ) : ''}
          <Modal show={this.state.show} hideModal={this.hideModal}>
            { !this.state.editMode ? (
              <AddCenter hideModal={this.hideModal} />
            ) : (
              <EditCenter
                hideModal={this.hideModal}
                centerId={this.state.centerId}
              />
            )}
          </Modal>
        </div>
        <div className="fixed-action-btn horizontal click-to-toggle">
          <button
            onClick={this.showModal}
            className={whiteColorClasses}
          >
            <i className="material-icons">add</i>
          </button>
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
