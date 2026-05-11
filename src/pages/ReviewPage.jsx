import "./ReviewPage.scss";

const ReviewPage = () => {

  const handleReview = () => {

    window.location.href =
      "https://search.google.com/local/writereview?placeid=ChIJGeHl8ffhIxAR8JGF08VNM80",
        "_blank";
  };

  return (

    <div className="review-page">

      <div className="review-card">

        <div className="review-logo">
          ⭐
        </div>

        <h1>
          Votre avis compte
        </h1>

        <p>
          Merci de prendre quelques secondes pour partager votre expérience.
        </p>

        <div className="stars">
          ★★★★★
        </div>

        <button
          className="review-btn"
          onClick={handleReview}
        >
          Laisser un avis sur Google
        </button>

      </div>

    </div>
  );
};

export default ReviewPage;