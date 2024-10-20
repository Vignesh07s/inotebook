import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function NavBar() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onLogoutHandle = () => {
        localStorage.removeItem('token');
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set the logged-in state based on the token presence
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><strong>iNotebook</strong></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            {/* <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link> */}
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                            {/* <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link> */}
                        </li>

                    </ul>
                    <div className="d-flex">
                        {isLoggedIn ? (
                            <button className='btn btn-danger mx-1' onClick={onLogoutHandle}>Logout</button>
                        ) : (
                            <>
                                <Link className='btn btn-primary mx-1' role="button" to="/login">Login</Link>
                                <Link className='btn btn-primary mx-1' role="button" to="/signup">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
