import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center"> Feedback App</h1>
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}

export default App;