// src/Components/ViewProposal.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import "../styles/ViewProposal.css";

export default function ViewProposal() {
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);

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

  if (!proposal) return <div className="view-proposal">Loading...</div>;

  return (
    <>
      {/* <Sidebar /> */}
      <div className="view-proposal">
        <h1>{proposal.title || "Untitled"}</h1>
        <p><strong>Description:</strong> {proposal.description || "N/A"}</p>
        <p><strong>Client:</strong> {proposal.clientName || "N/A"}</p>
        <p><strong>Status:</strong> {proposal.status || "N/A"}</p>
      </div>
    </>
  );
}
