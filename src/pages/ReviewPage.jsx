import "./ReviewPage.scss";
import logo from "../assets/AVILogo.webp"
import Avilogo from "../assets/AVi.jpg"
import messageIcon from "../assets/7tCccS_28b320e8c063c54a.png"
import { MessageCircle, MoveRight, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const ReviewPage = () => {

  const handleReview = () => {

    window.location.href =
      "https://search.google.com/local/writereview?placeid=ChIJGeHl8ffhIxAR8JGF08VNM80",
      "_blank";
  };

  return (
    <div className="review-page">
      <div className="reviewContainer">
        <div className="heading">
          <img src={logo} alt="logo" />
          <h2>Une minute pour nous noter</h2>
          <p>Evaluez nos prestations et laissez un commentaire constructif.</p>
        </div>
        <div className="content">
          <div className="review-btns">
            <button onClick={handleReview} className="red">
              <div className="icon">
                <img src={messageIcon} alt="messageIcon" />
              </div>
              Je donne mon avis
              <MoveRight />
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="left-footer">
          <div className="logo">
          <img src={Avilogo} alt="avilogo" />
          </div>
          <span>L'unique caution financiere étudiante certifiée ISO 9001</span>
        </div>
        <div className="social">
          <h3>suivez nous sur nos reseaux sociaux</h3>
          <ul>
            <li>
              <a href="#">
                <span>
                  <FaFacebook />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <FaInstagram />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <FaYoutube />
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="adress">
        <p>
          <span>
            <Phone />
          </span>
            +33188325450
        </p>
        <p>
          <span>
          <Mail />
        </span>
          hello@avicenter.fr
        </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;