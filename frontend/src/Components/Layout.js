import React from "react";
import Sidebar from "./Sidebar";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Layout.css";

function Layout({ children, user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1); // Go back one page
  };

  const isHomepage = location.pathname === "/";

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <div className="top-bar">
          {/* Only show back button if not on homepage */}
          {!isHomepage && (
            <button onClick={handleBack} className="back-btn">← Back</button>
          )}

          {/* Optional center space or logo */}
          <div></div>

          <div className="top-right">
            <span className="user-greeting">
              👋 Hi, {user?.displayName || "User"}
            </span>
            <button onClick={handleLogout} className="logout-btn">Sign Out</button>
          </div>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
