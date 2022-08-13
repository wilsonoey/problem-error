import React from 'react';
     
function ActionButton({ id, onDelete, archiveClick, isArchive }) {
  return (
    <div className="note-item__action">
      <button className='note-item__delete-button' onClick={() => onDelete(id)}>Delete</button>
      <button className='note-item__archive-button' onClick={() => archiveClick(id)}>{isArchive ? 'Unarchive' : 'Archive'}</button>
    </div>
  );
  
}
 
export default ActionButton;
