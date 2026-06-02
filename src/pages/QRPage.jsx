import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import "./QRPage.scss";
import logo from "../assets/AVi.jpg";
import qrLogo from "../assets/qrlogoAvi.jpeg";

const QR_URL = "https://avireview.pages.dev/?ref=qr";

const sharedOptions = {
  data: QR_URL,
  image: qrLogo,
  dotsOptions: {
    color: "#000000",
    type: "square",
  },
  cornersSquareOptions: {
    color: "#FD0000",
    type: "extra-rounded",
  },
  cornersDotOptions: {
    color: "#0056F3",
    type: "square",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 8,
    imageSize: 0.40,
  },
};

const qrCodeDisplay = new QRCodeStyling({
  ...sharedOptions,
  width: 280,
  height: 280,
  type: "canvas",
});

const qrCodeDownload = new QRCodeStyling({
  ...sharedOptions,
  width: 1000,
  height: 1000,
  type: "canvas",
});

const QRPage = () => {

  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCodeDisplay.append(qrRef.current);
    }
  }, []);

  const handleDownload = () => {
    qrCodeDownload.download({
      name: "qr-avicenter",
      extension: "png",
    });
  };

  return (
    <div className="qr-page">
      <div className="qr-card">

        <div className="qr-header">
          <img src={qrLogo} alt="AVICENTER" className="qr-logo" />
          <h1>QR Code — AVICENTER</h1>
          <p>Scannez pour laisser votre avis Google</p>
        </div>

        <div className="qr-code-wrap">
          <div ref={qrRef} />
        </div>

        <p className="qr-url">{QR_URL}</p>

        <button className="qr-download-btn" onClick={handleDownload}>
          Télécharger en PNG
        </button>

      </div>
    </div>
  );
};

export default QRPage;