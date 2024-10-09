import React, { useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const validateUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const json = await response.json();
            localStorage.setItem('token', json.authToken);
            navigate("/");
        } else {
            alert("Login failed");
            return;
        }

    }
    return (
        <form onSubmit={validateUser}>
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
                <input type="password" className="form-control" id="password" aria-describedby="passwordHelp"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
                <div id="passwordHelp" className="form-text"><Link to="/forgotpassword">forgot password?</Link></div>
            </div>
            <p>Don't have an account?? <Link to="/signup">Sign Up</Link> here</p>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}
