import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import "./QRPage.scss";
import logo from "../assets/AVi.jpg";

const QR_URL = "https://avicenter.pages.dev/?ref=qr";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "canvas",
  data: QR_URL,
  image: logo,
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
    margin: 6,
    imageSize: 0.35,
  },
});

const QRPage = () => {

  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, []);

  const handleDownload = () => {
    qrCode.download({
      name: "qr-avicenter",
      extension: "png",
    });
  };

  return (
    <div className="qr-page">
      <div className="qr-card">

        <div className="qr-header">
          <img src={logo} alt="AVICENTER" className="qr-logo" />
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