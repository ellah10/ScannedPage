import { useEffect } from "react";
import "./RedirectPage.scss";
import LogoAvi from "../assets/AVi.jpg";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

const RedirectPage = () => {

  useEffect(() => {

    const trackScan = async () => {

      const params = new URLSearchParams(window.location.search);
      const isFromQR = params.get("ref") === "qr";

      if (isFromQR) {

        const ua = navigator.userAgent;
        const screenW = window.innerWidth;

        const isTablet =
          /iPad/i.test(ua) ||
          (/Android/i.test(ua) && !/Mobile/i.test(ua)) ||
          (screenW >= 768 && /Mobi|Android|iPhone/i.test(ua));

        const isMobile =
          (
            /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
            /Mobi/i.test(ua) ||
            screenW < 768
          ) && !isTablet;

        const deviceType = isTablet
          ? "tablet"
          : isMobile
          ? "mobile"
          : "desktop";

        try {

          await addDoc(
            collection(db, "qr_scans"),
            {
              qrId: "google-review",
              scannedAt: serverTimestamp(),
              userAgent: ua,
              language: navigator.language,
              platform: navigator.platform,
              isMobile,
              isTablet,
              deviceType,
              screenWidth: screenW,
              screenHeight: window.innerHeight,
            }
          );

        } catch (error) {
          console.error("Erreur tracking scan :", error);
        }
      }

      window.location.href = "/review";
    };

    trackScan();

  }, []);

  return (
    <div className="redirect-screen">
      <div className="redirect-logo">
        <img src={LogoAvi} alt="LogoAvi" />
      </div>
      <div className="redirect-spinner" />
      <p className="redirect-text">Redirection en cours...</p>
    </div>
  );
};

export default RedirectPage;