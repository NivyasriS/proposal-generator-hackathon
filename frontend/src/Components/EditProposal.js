// src/Components/EditProposal.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import "../styles/EditProposal.css";

export default function EditProposal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState({
    title: "",
    description: "",
    clientName: "",
    status: "Pending",
  });

  useEffect(() => {
    const fetchProposal = async () => {
      const docRef = doc(db, "proposals", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProposal(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };
    fetchProposal();
  }, [id]);

  const handleChange = (e) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "proposals", id);
    await updateDoc(docRef, proposal);
    alert("Proposal updated!");
    navigate("/proposals");
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className="edit-proposal">
        <h1>Edit Proposal</h1>
        <form onSubmit={handleSubmit} className="edit-proposal-form">
          <label>Title</label>
          <input
            name="title"
            value={proposal.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            rows="5"
            value={proposal.description}
            onChange={handleChange}
            required
          />

          <label>Client Name</label>
          <input
            name="clientName"
            value={proposal.clientName}
            onChange={handleChange}
            required
          />

          <label>Status</label>
          <select
            name="status"
            value={proposal.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button type="submit">Update Proposal</button>
        </form>
      </div>
    </>
  );
}
