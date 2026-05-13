import "./ReviewPage.scss";
import logo from "../assets/AVILogo.webp";
import Avilogo from "../assets/AVi.jpg";
import messageIcon from "../assets/7tCccS_28b320e8c063c54a.png";
import { MoveRight, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube,FaStar  } from "react-icons/fa";

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
            {[1,2,3,4,5].map(i => (
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
          </div>

          <div className="social">
            <h3>Suivez-nous</h3>
            <ul>
              <li>
                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </li>
            </ul>
          </div>

          <div className="contact">
            <a href="tel:+33188325450">
              <Phone size={15} />
              +33 1 88 32 54 50
            </a>
            <a href="mailto:hello@avicenter.fr">
              <Mail size={15} />
              hello@avicenter.fr
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default ReviewPage;