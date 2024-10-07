import React, { useState,useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NotesItem from './NotesItem';
import CreateAndUpdateForm from './CreateAndUpdateForm'

export default function Notes() {
    const context = useContext(NoteContext);
    const [formVisible, setFormvisible] = useState(false);
    const [searchBarVisible, setSearchBarvisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [call, setCall] = useState('add');
    const [id, setId] = useState('');
    const changeAddState = () => {
        setFormvisible(!formVisible)
    }
    const changeSearchState = () => {
        setSearchBarvisible(!searchBarVisible)
    }
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    return (
        <div className='mx-3 my-3'>
            <div className='d-flex justify-content-center'>
                <h1 className='notes-color mb-0'>My Saved Notes</h1>
            </div>
            <hr className='mt-1 mb-0' />
            <i className="fa-solid fa-plus m-1" onClick={changeAddState}></i>
            <i className="fa-solid fa-magnifying-glass m-1" onClick={changeSearchState}></i>
            <CreateAndUpdateForm
                formVisible={formVisible} call = {call} id={id}
                changeAddState={changeAddState} title={title} description={description}
                onTitleChange={onTitleChange} onDescriptionChange={onDescriptionChange}
                setTitle={setTitle} setDescription={setDescription}
            />
            {searchBarVisible && (
                <div>
                    <input className="form-control my-2" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                    <datalist id="datalistOptions">
                        {
                            context.notes.map((note) => (
                                <option value={note.title} key={note._id}/>
                            ))
                        }
                    </datalist>
                </div>
            )}
            {context.notes.map((note, index) => (
                <NotesItem note={note} key={note._id} setCall = {setCall} setFormvisible={setFormvisible} setTitle={setTitle} setId={setId} setDescription={setDescription} />
            ))}
        </div>
    )
}
