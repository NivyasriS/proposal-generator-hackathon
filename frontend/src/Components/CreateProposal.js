// src/Components/CreateProposal.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "./Sidebar"; // If you want your sidebar visible!
import "../styles/CreateProposal.css";

export default function CreateProposal({ user }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "proposals"), {
        title,
        description,
        clientName,
        status: status.toLowerCase(),
        createdBy: user?.email || "Unknown",
        createdAt: serverTimestamp(),
      });
      alert("Proposal created successfully!");
      navigate("/proposals");
    } catch (error) {
      console.error("Error adding proposal: ", error);
      alert("Failed to create proposal.");
    }
  };

  return (
    <div className="create-page-container">
      {/* Uncomment if you want sidebar */}
      {/* <Sidebar /> */}

      <div className="create-proposal-wrapper">
        <form onSubmit={handleSubmit} className="create-proposal-form">
          <h1>Create New Proposal</h1>

          <label>Title</label>
          <input
            type="text"
            required
            placeholder="Enter proposal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            required
            rows="5"
            placeholder="Enter proposal description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Client Name</label>
          <input
            type="text"
            required
            placeholder="Enter client name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            {/* <option value="sent">Sent</option> */}
            <option value="draft">Draft</option>
          </select>

          <button type="submit">Create Proposal</button>
        </form>
      </div>
    </div>
  );
}
