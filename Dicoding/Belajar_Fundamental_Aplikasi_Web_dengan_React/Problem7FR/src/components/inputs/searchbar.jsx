import React from 'react';
import PropTypes from 'prop-types';
import './inputs.css';

function SearchBar({ keyword, keywordChange }) {
  return (
    <input
      className="edit-service-textinput TextSM input"
      type="text"
      placeholder="Silakan cari jasa"
      value={keyword}
      onChange={(event) => keywordChange(event.target.value)} />
  )
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
}

export default SearchBar;