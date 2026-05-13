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

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
          .test(navigator.userAgent);

      try {

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

      } catch (error) {

        console.log(error);

      }

      window.location.href = "/review";
    };

    trackScan();

  }, []);

  return <p>Redirection...</p>;
};

export default RedirectPage;