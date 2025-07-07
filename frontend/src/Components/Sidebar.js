import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-nav">
      <h2>ProposalGen</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/proposals">Proposals</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
