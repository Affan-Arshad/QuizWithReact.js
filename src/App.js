// Dependencies
import React from "react";
import Quiz from "./components/Quiz";

// Styles
import "./tailwind.output.css";
import "./custom.css";

const App = () => {
  return (
    <div className="w-100 bg-gray-200">
      <Quiz />
    </div>
  );
};

export default App;
