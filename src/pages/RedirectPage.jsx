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

        await addDoc(
          collection(db, "qr_scans"),
          {

            qrId: "google-review",

            scannedAt: serverTimestamp(),

            userAgent: navigator.userAgent,

            language: navigator.language,

            platform: navigator.platform,

            isMobile:
              /Android|iPhone|iPad|iPod/i
                .test(navigator.userAgent),

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