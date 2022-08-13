import React from 'react';
import NoteItemBody from './NoteItemBody';
import ActionButton from './ActionButton';
 
function NoteItem({ title, body, id, onDelete, createdAt, archiveClick, archived }) {
 return (
   <div className="note-item">
     <NoteItemBody title={title} body={body} createdAt={createdAt} />
     <ActionButton id={id} onDelete={onDelete} archiveClick={archiveClick} isArchive={archived}  />
   </div>
 );
}
 
export default NoteItem;