import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function Alert(props) {
    const context = useContext(NoteContext);
  return (
    context.showAlert && <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{context.alertMessage}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}