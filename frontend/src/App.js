// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Layout from "./Components/Layout";
import Homepage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import Proposals from "./Components/Proposals";
import CreateProposal from "./Components/CreateProposal";
import ViewProposal from "./Components/ViewProposal";
import EditProposal from "./Components/EditProposal";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userRole = userSnap.data().role || "user";
          setRole(userRole);
        } else {
          setRole("user");
        }
      } else {
        setRole("");
      }
    });

    return unsub;
  }, []);

  // Unauthenticated routes
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Authenticated routes
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout user={user}>
            <Homepage user={user} role={role} />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout user={user}>
            <Dashboard user={user} role={role} />
          </Layout>
        }
      />
      <Route
        path="/proposals"
        element={
          <Layout user={user}>
            <Proposals user={user} role={role} />
          </Layout>
        }
      />
      <Route
        path="/create"
        element={
          <Layout user={user}>
            <CreateProposal user={user} role={role} />
          </Layout>
        }
      />
      <Route
        path="/view/:id"
        element={
          <Layout user={user}>
            <ViewProposal user={user} role={role} />
          </Layout>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <Layout user={user}>
            <EditProposal user={user} role={role} />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
