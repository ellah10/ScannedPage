import { useEffect, useState } from "react";
import './AdminDashboard.scss'
import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.scss";

const AdminDashboard = () => {

  const [scans, setScans] = useState([]);
  const navigate = useNavigate();

  // 🔐 protection route
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        if (!user) {
          navigate("/admin-login");
        }

      });

    return () => unsubscribe();

  }, []);

  // 📊 fetch data
  useEffect(() => {

    const fetchScans = async () => {

      const querySnapshot =
        await getDocs(collection(db, "qr_scans"));

      const data =
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      setScans(data);
    };

    fetchScans();

  }, []);

  // 🚪 logout
  const handleLogout = async () => {

    await signOut(auth);

    navigate("/admin-login");
  };

  const totalScans = scans.length;

  const mobileScans =
    scans.filter(s => s.isMobile).length;

  const desktopScans =
    totalScans - mobileScans;

  return (

    <div className="admin-dashboard">

      {/* HEADER ADMIN */}
      <div className="admin-header">

        <h1>QR statistiques</h1>

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
          <h2>Total de Scans</h2>
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