import "./ReviewPage.scss";
import logo from "../assets/AVILogo.webp"
import messageIcon from "../assets/7tCccS_28b320e8c063c54a.png"
import { MessageCircle, MoveRight  } from 'lucide-react';

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
            <button className="blue">
              Suivez nous sur Nos réseaux sociaux
            </button>
            <button className="black">
              Nos Horaires
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;