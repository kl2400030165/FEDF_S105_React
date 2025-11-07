import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedback } from "../features/feedbackSlice";

function FeedbackForm() 
{
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) 
    {
      setError("Please select a rating before submitting.");
      return;
    }
    dispatch(addFeedback({ rating, comment }));
    setRating("");
    setComment("");
    setError("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border p-4 rounded-lg shadow-md bg-white mb-6"
    >
      <h2 className="text-lg font-semibold mb-3">Leave Feedback</h2>

      {/* Rating Options */}
      <div className="mb-3">
        <label className="block mb-2">Rating:</label>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} className="flex items-center gap-1">
              <input
                type="radio"
                name="rating"
                value={num}
                checked={rating === num.toString()}
                onChange={(e) => setRating(e.target.value)}
              />i
              {num}
            </label>
          ))}
        </div>
      </div>

      {/* Comment Box */}
      <div className="mb-3">
        <label className="block mb-2">Comments (optional):</label>
        <textarea
          className="border w-full p-2 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts..."
        />
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;