import React from 'react';
import NoteItem from './NoteItem.js';
 
function NoteList({ notes, onDelete, archiveClick }) {
 if (notes.length === 0)  {
  return(<h className='notes-list__empty-message'>Tidak ada catatan</h>);
 }
 else if (notes.length >= 0) {
  return (
   <div className="notes-list">
     {
       notes.map((note) => (
         <NoteItem key={note.id} 
         id={note.id}
         onDelete={onDelete}
         archiveClick={archiveClick}
          {...note} />
       ))
     }
   </div>
 );
 }
 
}
 
export default NoteList;

