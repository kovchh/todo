import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Perform any additional actions after successful logout
      navigate("/"); // Redirect to "/" after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="logout-container">
      <h2 className="logout-title">Logout</h2>
      <p className="logout-message">Are you sure you want to log out?</p>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
