import React from 'react'
import DeleteEdit from './DeleteEdit';

export default function NotesItem(props) {
    const note = props.note;
    return (
        <div className="card my-3">
            <div className="card-header d-flex justify-content-between">
                <div>
                    <strong>{note.title}</strong>
                </div>
                <div>
                    <DeleteEdit note={note}/>
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