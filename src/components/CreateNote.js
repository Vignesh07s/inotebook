import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function CreateNote() {
    const context = useContext(NoteContext);
    const [formVisible, setFormvisible] = useState(false);
    const [searchBarVisible, setSearchBarvisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') {
            alert('Invalid title');
            return;
        }

        if (description.trim() === '') {
            alert("Invalid description")
            return;
        }

        context.addNote(title, description);
        setTitle('');
        setDescription('');
        changeAddState();
    }
    return (
        <div>
            <i className="fa-solid fa-plus m-1" onClick={changeAddState}></i>
            <i className="fa-solid fa-magnifying-glass m-1" onClick={changeSearchState}></i>
            {formVisible && (
                <form action="#" onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label my-0"><h5>Title</h5></label>
                        <input type="text" className="form-control my-0" id="title" placeholder="Enter the title" required onChange={onTitleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label my-0"><h5>Description</h5></label>
                        <textarea className="form-control my-0" id="description" rows="9" placeholder='Enter the desription' required onChange={onDescriptionChange}></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary'>Add note</button>
                </form>
            )}
            {searchBarVisible && (
                <div>
                    <input className="form-control my-2" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                    <datalist id="datalistOptions">
                        {
                            context.notes.map((note) => (
                                <option value={note.title}/>
                            ))
                        }
                    </datalist>
                </div>
            )}
        </div>
    )
}
