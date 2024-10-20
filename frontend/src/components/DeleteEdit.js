import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function DeleteEdit(props) {
    const context = useContext(NoteContext);
    const id = props.note._id;
    const [title, setTitle] = useState(props.note.title);
    const [description, setDescription] = useState(props.note.description);
    const onDeleteClick = async () => {
        await context.deleteNote(id);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || title.length < 3) {
            alert('Title must be greater or equal to 3 characters');
            return;
        }

        if (description.trim() === '' || description.length < 5) {
            alert('Description must be greater or equal to 5 characters');
            return;
        }
        context.updateNote(id, title, description);
        context.updateAlertMessage('Notes updated successfully');
        context.updateShowAlert();
    }


    const handleOnClose = () => {
        setTitle(props.note.title);
        setDescription(props.note.description);
    }

    const onDraftHandle = () => {
        context.updateAlertMessage('Draft saved');
        context.updateShowAlert();
    }
    return (
        <>
            {/* delete icon*/}
            <i className="fa-solid fa-trash-can mx-2" data-bs-toggle="modal" data-bs-target={`#deleteModal-${id}`}></i>
            {/* delete modal */}
            <div className="modal fade" id={`deleteModal-${id}`} tabIndex="-1" aria-labelledby={`#deleteModalLabel-${id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`deleteModalLabel-${id}`}>{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onDeleteClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* edit icon */}
            <i className="fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target={`#editModal-${id}`}></i>
            {/* edit modal */}
            <div className="modal fade" id={`editModal-${id}`} tabIndex="-1" aria-labelledby={`#editModalLabel-${id}`} aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-lg" id={`editModalLabel-${id}`}>Update Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onDraftHandle}></button>
                        </div>
                        <form action='#' onSubmit={handleOnSubmit}>
                            <div className="modal-body">
                                <div className="mb-0">
                                    <label htmlFor="title" className="col-form-label"><strong>Title:</strong></label>
                                    <input type="text" className="form-control my-0" id="title" placeholder="Enter the title" required onChange={(e) => setTitle(e.target.value)} value={title} />
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="description" className="col-form-label"><strong>Description:</strong></label>
                                    <textarea className="form-control " id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOnClose}>Close</button>
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={onDraftHandle}>Draft</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
