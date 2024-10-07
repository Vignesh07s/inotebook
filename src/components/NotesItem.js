import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function NotesItem(props) {
    const context = useContext(NoteContext);
    const note = props.note;
    const onDeleteClick = (id) => {
        // const updatedNotes = context.notes.filter((note)=>note._id!==id);
        // context.updateAfterDelete(updatedNotes);
        context.deleteNote(id);
    };
    const onEditClick = (id) => {
        props.setFormvisible(true);
        props.setTitle(note.title);
        props.setDescription(note.description);
        props.setCall("update");
        props.setId(note._id);
    };
    return (
        <div className="card my-3">
            <div className="card-header d-flex justify-content-between">
                <div>
                    <strong>{note.title}</strong>
                </div>
                <div>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => {onDeleteClick(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{onEditClick(note._id)}}></i>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{note.description}</p>
                <p className="card-text">
                    <i
                        className="fa-duotone fa-solid fa-tag fa-rotate-by fa-sm mx-2"
                        style={{
                            "--fa-secondary-color": "#33ff0a",
                            "--fa-secondary-opacity": "1",
                            "--fa-rotate-angle": "90deg"
                        }}
                    ></i>
                    {note.tag}
                </p>
            </div>
        </div >
    )
}
