import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NotesItem from './NotesItem';
import CreateNote from './CreateNote';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        context.fetchNotes();
    });

    return (
        <div className='mx-3'>
            <Alert />
            <div className='text-center mb-3'>
                <strong className='display-4 mb-0 notes-header fw-bold'>My Saved Notes</strong>
                <hr className='my-2' />
                <CreateNote />
            </div>
            {
                context.notes.map((note) => (
                    <NotesItem note={note} key={note._id} />
                ))
            }
        </div >
    )
}
