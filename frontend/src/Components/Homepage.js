import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // adjust path based on your file structure
import "../styles/Homepage.css";

export default function Homepage({ user }) {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // 🔽 Query to get proposals ordered by createdAt DESC
        const q = query(collection(db, "proposals"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const proposalsList = snapshot.docs.map((doc) => doc.data());
        setProposals(proposalsList);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  // 🔽 First item is now the latest thanks to orderBy("createdAt", "desc")
  const latestProposal = proposals[0]?.title || "N/A";

  return (
    <div className="homepage">
      <div className="background-image"></div>

      <div className="hero-content">
        <h1>👋 Hi, {user?.displayName || "User"}!</h1>
        <p>
          Welcome to <strong>Relanto</strong> — your collaborative hub for creating,
          managing, and tracking winning proposals.
        </p>
        <button onClick={() => navigate("/create")}>Start a New Proposal</button>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h2>Total Proposals</h2>
          <p>{proposals.length}</p>
        </div>

        <div className="stat-card">
          <h2>Latest Client</h2>
          <p>TechNova Solutions</p>
        </div>

        <div className="stat-card">
          <h2>Latest Proposal</h2>
          <p>{latestProposal}</p>
        </div>
      </div>
    </div>
  );
}
