import { useEffect } from "react";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

const RedirectPage = () => {

  useEffect(() => {

    const trackScan = async () => {

      try {

        // 📱 Détection mobile plus fiable
        const isMobile =
          window.innerWidth <= 768;

        // 🔥 Enregistrement du scan
        await addDoc(
          collection(db, "qr_scans"),
          {

            qrId: "google-review",

            scannedAt: serverTimestamp(),

            userAgent: navigator.userAgent,

            language: navigator.language,

            platform: navigator.platform,

            isMobile,

            screenWidth: window.innerWidth,

            screenHeight: window.innerHeight,
          }
        );

        console.log("SCAN ENREGISTRÉ");

        // ⏳ Petit délai avant redirection
        setTimeout(() => {

          window.location.href = "/review";

        }, 800);

      } catch (error) {

        console.log(error);
      }
    };

    trackScan();

  }, []);

  return <p>Redirection...</p>;
};

export default RedirectPage;