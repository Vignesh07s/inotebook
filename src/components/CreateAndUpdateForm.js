import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function CreateNote(props) {

    const context = useContext(NoteContext);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (props.title.trim() === '') {
            alert('Invalid title');
            return;
        }

        if (props.description.trim() === '') {
            alert("Invalid description")
            return;
        }

        if(props.call==="add") context.addNote(props.title, props.description);
        if(props.call==="update") context.updateNote(props.id,props.title, props.description);
        props.setTitle('');
        props.setDescription('');
        props.changeAddState();
    }
    return (
        <div>
            {props.formVisible && (
                <form action="#" onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label my-0"><h5>Title</h5></label>
                        <input type="text" className="form-control my-0" id="title" placeholder="Enter the title" required onChange={props.onTitleChange} value={props.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label my-0"><h5>Description</h5></label>
                        <textarea className="form-control my-0" id="description" rows="9" placeholder='Enter the desription' required onChange={props.onDescriptionChange} value={props.description}></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary'>Add note</button>
                </form>
            )}
        </div>
    )
}
