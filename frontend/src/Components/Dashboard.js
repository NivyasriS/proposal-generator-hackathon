// src/Components/Dashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [proposals, setProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "proposals"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProposals(data);
    });

    return () => unsub();
  }, []);

  const statusCount = {
    approved: 0,
    pending: 0,
    rejected: 0
  };

  proposals.forEach((p) => {
    const key = (p.status || "").toLowerCase();
    if (statusCount.hasOwnProperty(key)) {
      statusCount[key]++;
    }
  });

  const totalProposals = proposals.length;

  const filteredProposals = proposals.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      (p.title || "").toLowerCase().includes(term) ||
      (p.clientName || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <input
          type="text"
          placeholder="Search proposals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="cards-container">
        <div className="card total">
          <p>Total Proposals</p>
          <h2>{totalProposals}</h2>
        </div>
        <div className="card approved">
          <p>Approved</p>
          <h2>{statusCount.approved}</h2>
        </div>
        <div className="card pending">
          <p>Pending</p>
          <h2>{statusCount.pending}</h2>
        </div>
        <div className="card rejected">
          <p>Rejected</p>
          <h2>{statusCount.rejected}</h2>
        </div>
      </div>

      <div className="table-container">
        <table className="proposals-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Client</th>
              <th>Created By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.map((p) => (
              <tr key={p.id}>
                <td>{p.status || "Unknown"}</td>
                <td>{p.title || "Untitled"}</td>
                <td>{p.clientName || "No Client"}</td>
                <td>{p.createdBy || "Unknown"}</td>
                <td>
                  {p.createdAt?.toDate
                    ? new Date(p.createdAt.toDate()).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProposals.length === 0 && (
          <p className="no-data">No proposals found.</p>
        )}
      </div>
    </div>
  );
}
