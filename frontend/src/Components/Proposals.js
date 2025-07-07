import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Proposals.css";

export default function Proposals({ user, role }) {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !role) return;

    const q =
      role === "admin"
        ? query(collection(db, "proposals"), orderBy("createdAt", "desc"))
        : query(
            collection(db, "proposals"),
            where("createdBy", "==", user.email),
            orderBy("createdAt", "desc")
          );

    const unsub = onSnapshot(q, (snapshot) => {
      setProposals(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsub;
  }, [user, role]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      await deleteDoc(doc(db, "proposals", id));
    }
  };

  return (
    <div className="proposals-wrapper">
      <div className="proposals-header">
        <h1>{role === "admin" ? "All Proposals (Admin)" : "My Proposals"}</h1>
        <button className="create-btn" onClick={() => navigate("/create")}>
          + Create Proposal
        </button>
      </div>

      <div className="proposals-grid">
        {proposals.length === 0 ? (
          <p className="no-proposals">No proposals available.</p>
        ) : (
          proposals.map((p) => {
            const status = (p.status || "Unknown").toLowerCase();
            const canEditOrDelete =
              status !== "approved" && status !== "rejected";

            return (
              <div key={p.id} className="proposal-card">
                <div className="proposal-header">
                  <h2>{p.title || "Untitled"}</h2>
                  <span className={`status ${status}`}>{status}</span>
                </div>
                <p className="proposal-description">
                  {p.description || "No description provided."}
                </p>
                <p className="proposal-client">
                  <strong>Client:</strong> {p.clientName || "N/A"}
                </p>
                <p className="proposal-created">
                  <strong>Created By:</strong> {p.createdBy || "Unknown"}
                </p>
                <div className="proposal-actions">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/view/${p.id}`)}
                  >
                    View
                  </button>

                  <button
                    className={`edit-btn ${!canEditOrDelete ? "disabled" : ""}`}
                    onClick={() =>
                      canEditOrDelete && navigate(`/edit/${p.id}`)
                    }
                    disabled={!canEditOrDelete}
                  >
                    Edit
                  </button>

                  <button
                    className={`delete-btn ${!canEditOrDelete ? "disabled" : ""}`}
                    onClick={() => canEditOrDelete && handleDelete(p.id)}
                    disabled={!canEditOrDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
