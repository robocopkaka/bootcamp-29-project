import React from 'react';
import classNames from 'classnames';
import * as styles from '../../css/index.module.css';

const searchClasses = classNames(styles['input-field'], styles['search-field']);

const Search = () => {
  return (
    // Start of search bar
    <div className="">
      <form>
        <div className={searchClasses}>
          <input id="search" type="search" required placeholder="Search for centers" />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
      </form>
    </div>
  );
};
export default Search;
