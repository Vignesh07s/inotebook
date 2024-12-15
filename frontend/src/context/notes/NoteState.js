import { useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    // const url = "https://inotebook-backend-aenu.onrender.com";
    const url = "http://localhost:4000";

    const updateShowAlert = () => {
        setShowAlert(!showAlert);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }

    const updateAlertMessage = (message) => {
        setAlertMessage(message);

    }

    //fetchNotes request
    const fetchNotes = async () => {
        try {
            const response = await fetch(`${url}/api/notes/readnotes`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch notes");
            }

            const initialNotes = await response.json();
            setNotes(initialNotes);
        } catch (error) {
            console.error("Error fetching notes: ", error);
        }
    };

    //Add note function
    const addNote = async (title, description, tag = "general") => {
        try {
            const response = await fetch(`${url}/api/notes/addnotes`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (response.status === 409) {
                const errorData = await response.json();
                const errorMessage = errorData.error || "A conflict occurred.";
                console.error("Error data:", errorMessage);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch notes");
            }

            await fetchNotes();
        } catch (error) {
            console.error("Error adding notes: ", error);
        }
    }


    //Update a Note function
    const updateNote = async (id, title, description, tag = "General") => {
        try {
            const response = await fetch(`${url}/api/notes/updatenotes/` + id, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error data:", errorData);
                throw new Error("Failed to fetch notes");
            }
            await fetchNotes();
        } catch (error) {
            console.error(error)
        }

    }




    //Delete note function
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${url}/api/notes/deletenote/` + id, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch notes");
            }
            await fetchNotes();
        } catch (error) {
            console.error(error)
        }
    }


    // const updateAfterDelete = (newNotes) => {
    //     setNotes(newNotes);
    // }

    return (
        <NoteContext.Provider value={{ notes, fetchNotes,addNote, deleteNote, updateNote, updateShowAlert, updateAlertMessage, showAlert, alertMessage }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;