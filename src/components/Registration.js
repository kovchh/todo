import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      navigate("/"); // Redirect to "/" after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register</h2>
      <form onSubmit={signUp} className="register-form">
        <label htmlFor="email" className="register-form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-form-input"
          required
        />
        <label htmlFor="password" className="register-form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-form-input"
          required
        />
        <label htmlFor="confirm-password" className="register-form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-form-input"
          required
        />
        <button type="submit" className="register-form-button">
          Register
        </button>
      </form>
      {error && <p className="register-form-error">{error}</p>}
      <p className="register-form-login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Registration;
