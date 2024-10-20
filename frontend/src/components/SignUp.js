import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

export default function SignUp() {
  const context = useContext(NoteContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [cpasswordText, setCpasswordText] = useState("");
  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    if(password!==cpassword){
      setCpasswordText("Password do not match");
      return;
    }
    const response = await fetch('http://localhost:5000/api/auth/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem('token', json.authToken);
      context.fetchNotes();
      navigate("/");
    } else {
      alert("SignUp failed");
      return;
    }

  }
  return (
    <form onSubmit={registerUser}>
      <div className='mb-3'>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mail" className="form-label">Email</label>
        <input type="email" className="form-control" id="mail" aria-describedby="emailHelp"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword"
          value={cpassword}
          disabled={password.length === 0}
          onChange={(e)=>setCPassword(e.target.value)}
          required
        />
        <div id="emailHelp" className="form-text">{cpasswordText}</div>
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
}
