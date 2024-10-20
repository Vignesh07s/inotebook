import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function CreateNote() {
    const context = useContext(NoteContext);
    const defaultTitle = 'Untitled note';
    const [formVisible, setFormvisible] = useState(false);
    const [searchBarVisible, setSearchBarvisible] = useState(false);
    const [count, setCount] = useState(1);
    const [title, setTitle] = useState(defaultTitle+count);
    const [description, setDescription] = useState('');

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
        context.addNote(title,description);
        setFormvisible(!formVisible);
        context.updateAlertMessage('Notes added successfully');
        context.updateShowAlert();
        if(title===defaultTitle+count){
            setCount(count+1);
        }
        setTitle(defaultTitle+count);
        setDescription('');
    }
    return (
        <div>
            <i className="fa-solid fa-plus m-1" onClick={() => setFormvisible(!formVisible)}></i>
            <i className="fa-solid fa-magnifying-glass m-1" onClick={() => setSearchBarvisible(!searchBarVisible)}></i>
            {formVisible && (
                <form action="#" onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label my-0"><h5>Title</h5></label>
                        <input type="text" className="form-control my-0" id="title" placeholder="Enter the title" required onChange={(e) =>setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label my-0"><h5>Description</h5></label>
                        <textarea className="form-control my-0" id="description" rows="9" placeholder='Enter the desription' required onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
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
                                <option value={note.title} key={note._id} />
                            ))
                        }
                    </datalist>
                </div>
            )}
        </div>
    )
}
