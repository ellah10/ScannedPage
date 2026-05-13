import { useEffect, useState } from "react";
import "./AdminDashboard.scss";

import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [scans, setScans] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin-login");
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const q = query(
      collection(db, "qr_scans"),
      orderBy("scannedAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setScans(data);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  // ── Stats globales ──────────────────────────────────
  const totalScans = scans.length;

  const mobileScans = scans.filter(s => s.deviceType === "mobile").length;
  const tabletScans = scans.filter(s => s.deviceType === "tablet").length;
  const desktopScans = scans.filter(s => s.deviceType === "desktop").length;

  // ── Stats temporelles ───────────────────────────────
  const now = new Date();

  const todayScans = scans.filter(s => {
    if (!s.scannedAt) return false;
    const d = s.scannedAt.toDate();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);

  const weekScans = scans.filter(s => {
    if (!s.scannedAt) return false;
    return s.scannedAt.toDate() >= weekStart;
  }).length;

  // ── Scans ce mois ───────────────────────────────────
  const monthScans = scans.filter(s => {
    if (!s.scannedAt) return false;
    const d = s.scannedAt.toDate();
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const currentMonth = monthNames[now.getMonth()];

  // ── Scans par jour (7 derniers jours) ───────────────
  const dayLabels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const scansByDay = Array(7).fill(0).map((_, i) => {
    const day = new Date(now);
    day.setDate(now.getDate() - (6 - i));
    const count = scans.filter(s => {
      if (!s.scannedAt) return false;
      const d = s.scannedAt.toDate();
      return (
        d.getDate() === day.getDate() &&
        d.getMonth() === day.getMonth() &&
        d.getFullYear() === day.getFullYear()
      );
    }).length;
    return { label: dayLabels[day.getDay()], count };
  });

  const maxDay = Math.max(...scansByDay.map(d => d.count), 1);

  // ── Derniers scans ──────────────────────────────────
  const recentScans = scans.slice(0, 5);

  const timeAgo = (timestamp) => {
    if (!timestamp) return "—";
    const diff = Math.floor((now - timestamp.toDate()) / 1000);
    if (diff < 60) return `Il y a ${diff}s`;
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    return `Il y a ${Math.floor(diff / 86400)}j`;
  };

  // ── Pourcentages ────────────────────────────────────
  const pct = (n) =>
    totalScans === 0 ? 0 : Math.round((n / totalScans) * 100);

  // ── Attendre la vérification auth ──────────────────
  if (!authChecked) return null;

  return (
    <div className={`admin-dashboard ${darkMode ? "dark" : ""}`}>

      {/* HEADER */}
      <div className="admin-header">
        <h1>QR Statistiques</h1>
        <div className="header-right">

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Changer le thème"
          >
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* STATS GLOBALES */}
      <p className="section-label">Vue d'ensemble</p>
      <div className="stats-grid">

        <div className="stat-card accent-blue">
          <p className="stat-label">Total scans</p>
          <p className="stat-value">{totalScans}</p>
          <p className="stat-sub">Depuis le début</p>
        </div>

        <div className="stat-card accent-red">
          <p className="stat-label">Cette semaine</p>
          <p className="stat-value">{weekScans}</p>
          <p className="stat-sub">7 derniers jours</p>
        </div>

        <div className="stat-card accent-blue">
          <p className="stat-label">Aujourd'hui</p>
          <p className="stat-value">{todayScans}</p>
          <p className="stat-sub">Scans du jour</p>
        </div>

        <div className="stat-card accent-red">
          <p className="stat-label">Ce mois</p>
          <p className="stat-value">{monthScans}</p>
          <p className="stat-sub">{currentMonth} {now.getFullYear()}</p>
        </div>

      </div>

      {/* GRAPHIQUES */}
      <div className="two-col">

        {/* Scans par jour */}
        <div className="card">
          <p className="card-title">Scans par jour (7 jours)</p>
          <div className="bars">
            {scansByDay.map((d, i) => (
              <div className="bar-row" key={i}>
                <span className="bar-label">{d.label}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(d.count / maxDay) * 100}%` }}
                  />
                </div>
                <span className="bar-count">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appareils */}
        <div className="card">
          <p className="card-title">Appareils</p>
          <div className="device-list">

            <div className="device-row">
              <span className="device-label">Mobile</span>
              <div className="bar-track">
                <div
                  className="bar-fill mobile"
                  style={{ width: `${pct(mobileScans)}%` }}
                />
              </div>
              <span className="bar-count">{pct(mobileScans)}%</span>
            </div>

            <div className="device-row">
              <span className="device-label">Desktop</span>
              <div className="bar-track">
                <div
                  className="bar-fill desktop"
                  style={{ width: `${pct(desktopScans)}%` }}
                />
              </div>
              <span className="bar-count">{pct(desktopScans)}%</span>
            </div>

            <div className="device-row">
              <span className="device-label">Tablette</span>
              <div className="bar-track">
                <div
                  className="bar-fill tablet"
                  style={{ width: `${pct(tabletScans)}%` }}
                />
              </div>
              <span className="bar-count">{pct(tabletScans)}%</span>
            </div>

          </div>
        </div>

      </div>

      {/* DERNIERS SCANS */}
      <div className="card">
        <p className="card-title">Derniers scans</p>
        <div className="scan-list">
          {recentScans.length === 0 && (
            <p className="empty">Aucun scan pour le moment.</p>
          )}
          {recentScans.map(scan => (
            <div className="scan-row" key={scan.id}>
              <span className="scan-time">{timeAgo(scan.scannedAt)}</span>
              <span className={`scan-device ${scan.deviceType}`}>
                {scan.deviceType === "mobile" ? "Mobile"
                  : scan.deviceType === "tablet" ? "Tablette"
                  : "Desktop"}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;