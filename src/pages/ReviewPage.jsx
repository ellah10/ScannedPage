import "./ReviewPage.scss";
import logo from "../assets/AVILogo.webp";
import Avilogo from "../assets/AVi.jpg";
import messageIcon from "../assets/7tCccS_28b320e8c063c54a.png";
import { MoveRight, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaStar, FaTiktok, FaWhatsapp } from "react-icons/fa";

const ReviewPage = () => {

  const handleReview = () => {
    window.location.href =
      "https://search.google.com/local/writereview?placeid=ChIJGeHl8ffhIxAR8JGF08VNM80";
  };

  return (
    <div className="review-page">

      <div className="reviewContainer">

        <div className="heading">
          <div className="logo-wrap">
            <img src={logo} alt="logo AVICENTER" />
          </div>
          <h2>Une minute pour nous noter</h2>
          <p>Évaluez nos prestations et laissez un commentaire constructif.</p>
        </div>

        <div className="content">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className="star">
                <FaStar />
              </span>
            ))}
          </div>
          <button onClick={handleReview} className="review-btn">
            <div className="btn-icon">
              <img src={messageIcon} alt="" />
            </div>
            <span>Je donne mon avis</span>
            <MoveRight size={20} />
          </button>
          <p className="hint">Redirige vers Google — moins d'une minute</p>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-inner">
          <div className="left-footer">
            <div className="footer-logo">
              <img src={Avilogo} alt="AVICENTER" />
            </div>
            <span>L'unique caution financière étudiante certifiée ISO 9001</span>
              {/* WHATSAPP */}
        {/* <div className="whatsapp-section">
          <p className="whatsapp-label">
            <FaWhatsapp className="whatsapp-icon" />
            Écrivez-nous sur WhatsApp
          </p>
          <div className="whatsapp-btns">
            <a href="https://wa.me/22870431111" target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn">
                <FaWhatsapp />
              +228 70 43 11 11
            </a>
            <a href="https://wa.me/22899761010" target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"><FaWhatsapp />
              +228 99 76 10 10
              </a>
          </div>
        </div> */}
          </div>

          <div className="social">
            <h3>Suivez-nous</h3>
            <ul>
              <li>
                <a href="https://www.facebook.com/share/1Czg1nJwRj/?mibextid=wwXIfr"  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook">
                    <FaFacebook />
                  </a>
              </li>
              <li>
                <a href="https://www.instagram.com/avicenter_togo_officiel?igsh=MWpkZWxjeWhzb2g5YQ==" target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram">
                    <FaInstagram />
                  </a>
              </li>
              <li>
                <a href="https://youtube.com/@avicenterfrance?si=GhfFqabqqJtaCYgg" target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"><FaYoutube /></a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@avicenter_togo?_r=1&_t=ZS-96KIWhC9YIP" target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok">
                    <FaTiktok />
                  </a>
              </li>
            </ul >
          </div >

  <div className="contact">
    {/* <a href="tel:+22870431111">
      <Phone size={15} />
      +228 70 43 11 11
    </a>
    <a href="tel:+22899761010">
      <Phone size={15} />
      +228 99 76 10 10
    </a> */}
    <div className="whatsapp-section">
          {/* <p className="whatsapp-label">
            <FaWhatsapp className="whatsapp-icon" />
            Écrivez-nous sur WhatsApp
          </p> */}
          <div className="whatsapp-btns">
            <a href="https://wa.me/22870431111" target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn">
                <FaWhatsapp />
              +228 70 43 11 11
            </a>
            <a href="https://wa.me/22899761010" target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"><FaWhatsapp />
              +228 99 76 10 10
              </a>
          </div>
        </div>
    <a href="mailto:togo@avicenter.fr">
      <Mail size={15} />
      togo@avicenter.fr
    </a>
  </div>

        </div >
      </footer >

    </div >
  );
};

export default ReviewPage;