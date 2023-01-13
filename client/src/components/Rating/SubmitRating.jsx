import { newEventRating } from "../../services/event";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SubmitRating = () => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const { productId } = useParams();

  const handleRatingChange = (e) => {
    setStars(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRating = await newEventRating({ stars, comment }, productId);
    console.log(newRating);
  };

  return (
    <div className="submit-rating">
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={stars} onChange={handleRatingChange}>
            <option value={0}>Select a rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <br />
        <label>
          Comment:
          <textarea value={comment} onChange={handleCommentChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitRating;
