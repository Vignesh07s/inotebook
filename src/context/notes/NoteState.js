import { useState, useEffect } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        fetchNotes();
    }, []);

    //fetchNotes request
    const fetchNotes = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/notes/readnotes", {
                method: "POST",
                mode: "cors",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMjYyYjZhNTM2ZmQ2MWIwNjJjMWFiIn0sImlhdCI6MTcyODIwOTYwOX0.DSmj6kWnnnomd3flwOjgGOGCHMT2P8gaW1ao0Do46zA",
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
            const response = await fetch("http://localhost:5000/api/notes/addnotes", {
                method: "POST",
                mode: "cors",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMjYyYjZhNTM2ZmQ2MWIwNjJjMWFiIn0sImlhdCI6MTcyODIwOTYwOX0.DSmj6kWnnnomd3flwOjgGOGCHMT2P8gaW1ao0Do46zA",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (response.status === 409) {
                const errorData = await response.json();
                const errorMessage = errorData.error || "A conflict occurred.";
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
            const response = await fetch("http://localhost:5000/api/notes/updatenotes/" + id, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMjYyYjZhNTM2ZmQ2MWIwNjJjMWFiIn0sImlhdCI6MTcyODIwOTYwOX0.DSmj6kWnnnomd3flwOjgGOGCHMT2P8gaW1ao0Do46zA",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
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
            const response = await fetch("http://localhost:5000/api/notes/deletenote/" + id, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMjYyYjZhNTM2ZmQ2MWIwNjJjMWFiIn0sImlhdCI6MTcyODIwOTYwOX0.DSmj6kWnnnomd3flwOjgGOGCHMT2P8gaW1ao0Do46zA",
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
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;