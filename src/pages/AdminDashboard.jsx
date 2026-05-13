import { useEffect, useState } from "react";
import "./AdminDashboard.scss";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [scans, setScans] = useState([]);

  const navigate = useNavigate();

  // 🔐 Protection admin
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        if (!user) {
          navigate("/admin-login");
        }

      });

    return () => unsubscribe();

  }, [navigate]);

  // 📊 Firestore realtime
  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "qr_scans"),

      (snapshot) => {

        const data = snapshot.docs.map(doc => ({

          id: doc.id,

          ...doc.data()

        }));

        setScans(data);
      }

    );

    return () => unsubscribe();

  }, []);

  // 🚪 Logout
  const handleLogout = async () => {

    await signOut(auth);

    navigate("/admin-login");
  };

  // 📈 Stats
  const totalScans = scans.length;

  const mobileScans =
    scans.filter(scan => scan.isMobile).length;

  const desktopScans =
    totalScans - mobileScans;

  return (

    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">

        <h1>QR Statistiques</h1>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Déconnexion
        </button>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h2>Total Scans</h2>
          <p>{totalScans}</p>
        </div>

        <div className="stat-card">
          <h2>Mobile</h2>
          <p>{mobileScans}</p>
        </div>

        <div className="stat-card">
          <h2>Desktop</h2>
          <p>{desktopScans}</p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;