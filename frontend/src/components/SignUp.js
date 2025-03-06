import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NoteContext from "../context/notes/NoteContext";

export default function SignUp() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const context = useContext(NoteContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    if (password !== cpassword) {
      setError("Passwords do not match");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch(`${url}/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("token", json.authToken);
        context.fetchNotes();
        navigate("/");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Create an Account</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="cpassword" className="form-label fw-semibold">Confirm Password</label>
            <div className="input-group">
              <input
                type={showCPassword ? "text" : "password"}
                className="form-control"
                id="cpassword"
                value={cpassword}
                disabled={password.length === 0 || loading}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowCPassword(!showCPassword)}
                disabled={loading}
              >
                {showCPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading || !name || !email || !password || !cpassword || password !== cpassword}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-primary">Log in</Link>
        </p>
      </div>
    </div>
  );
}
