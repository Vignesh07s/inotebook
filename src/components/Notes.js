import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NotesItem from './NotesItem';
import CreateNote from './CreateNote';

export default function Notes() {
    const context = useContext(NoteContext);
    return (
        <div className='mx-3 my-3'>
            <div className='d-flex justify-content-center'>
                <h1 className='notes-color mb-0'>My Saved Notes</h1>
            </div>
            <hr className='mt-1 mb-0'/>
            <CreateNote/>
            {context.notes.map((note,index)=>(
                <NotesItem note={note} key={index}/>
            ))}
        </div>
    )
}
