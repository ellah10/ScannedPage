import "./ReviewPage.scss";
import logo from "../assets/AVILogo.webp"

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
          <h3>L'unique caution financiere étudiante certifiée ISO 9001</h3>
        </div>
        <div className="content">
          <h2>Votre avis compte</h2>
          <div className="review-btns">
            <button onClick={handleReview}>
              Laisser un avis
            </button>
            <button className="blue">
              Suivez nous sur Nos réseaux
            </button>
            <button className="black">
              Nos Horaires
            </button>
            <button className="blue">
              Nos Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;