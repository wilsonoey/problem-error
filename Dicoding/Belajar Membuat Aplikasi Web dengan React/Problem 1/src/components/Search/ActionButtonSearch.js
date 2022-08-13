import React from 'react';

function ActionButtonSearch({ onSearch }) {
  return (
    <input class="note-search" type="text" placeholder="Search Name" onChange={(event) => onSearch(event.target.value)} />
  );
}

export default ActionButtonSearch;