import React from 'react';

const Search = () => {
  return (
    // Start of search bar
    <div className="">
      <form>
        <div className="input-field search-field">
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
