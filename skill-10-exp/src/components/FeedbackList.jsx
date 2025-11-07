import React from "react";
import { useSelector } from "react-redux";

function FeedbackList() 
{
  const feedbacks = useSelector((state) => state.feedback);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Submitted Feedback</h2>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback yet.</p>
      ) : (
        <ul className="space-y-3">
          {feedbacks.map((fb, index) => (
            <li
              key={index}
              className="border p-3 rounded-lg bg-gray-50 shadow-sm"
            >
              <p>
                <b>Rating:</b>  {fb.rating}
              </p>
              {fb.comment && (
                <p>
                  <b>Comment:</b> {fb.comment}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackList;