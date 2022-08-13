import React from 'react';
import ActionButtonSearch from './ActionButtonSearch';
 
function NoteSearch({ onSearch }) {
    return (
        <ActionButtonSearch onSearch={onSearch} />
    );
}
 
export default NoteSearch;