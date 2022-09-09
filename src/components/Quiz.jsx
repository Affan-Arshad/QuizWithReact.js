import React, { useState } from "react";

const Quiz = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  let [correct, setCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers((prev) => {
      prev[currentQuestion] = answer;
      return [...prev];
    });
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    }
  };

  const checkAnswers = () => {
    questions.forEach((question, i) => {
      if (question.answer == selectedAnswers[i]) setCorrect((prev) => prev + 1);
    });
    setShowResult(true);
  };

  const questions = [
    {
      question: "Why did the chicken cross the road?",
      options: [
        "to get to the other side",
        "to search for food",
        "to mark the burried treasure"
      ],
      answer: "give a chicken some freedom, geez!"
    },
    {
      question: "Why did the aligator cross the road?",
      options: [
        "to get to the other side",
        "to search for food",
        "to mark the burried treasure"
      ],
      answer: "give an aligator some freedom, geez!"
    },
    {
      question: "Why did the crocodile cross the road?",
      options: [
        "to get to the other side",
        "to search for food",
        "to mark the burried treasure"
      ],
      answer: "give a crocodile some freedom, geez!"
    }
  ];

  const randomizedOptions = React.useMemo(() => {
    return [
      ...questions[currentQuestion].options,
      questions[currentQuestion].answer
    ] // join options and answer into single array
      .sort(() => Math.random() - 0.5); // randomize
  }, [currentQuestion]);

  const options = randomizedOptions.map((option) => (
    <div key={currentQuestion + " " + option} className="answer">
      <label className="select-none">
        <input
          onChange={handleSelectAnswer.bind(this, option)}
          type="radio"
          value="1"
          name="answer"
          checked={selectedAnswers[currentQuestion] == option}
        />
        {" " + option}
      </label>
    </div>
  ));

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setCorrect(0);
    setShowResult(false);
  };

  return (
    <div>
      {!showResult && (
        <div className="select-none grid grid-cols-12 p-6">
          {/* Sidebar */}
          <div className="col-span-3 z-10">
            <ul>
              {questions.map((v, i) => (
                <li
                  onClick={() => setCurrentQuestion(i)}
                  key={i}
                  className={
                    "cursor-pointer border p-2 " +
                    (currentQuestion == i
                      ? "bg-white border-r-0 font-bold border-blue-500 "
                      : "bg-gray-200 border-r-blue-500 ") +
                    (selectedAnswers[i] && !(currentQuestion == i)
                      ? "bg-gradient-to-r from-transparent via-transparent to-blue-200 "
                      : "")
                  }
                >
                  Question {i + 1}
                </li>
              ))}
            </ul>
          </div>

          {/* Main area */}
          <div className="col-span-9 p-4 border border-blue-500 bg-white ml--1">
            <h1 className="font-bold border-b pb-1 mb-1">
              {questions[currentQuestion].question}
            </h1>
            {options}

            {/* prev / next / submit buttons */}
            <div className="flex justify-between mt-6">
              <div>
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    className="border px-3 py-1 bg-blue-500 text-white select-none"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion((prev) => prev + 1)}
                    className="border px-3 py-1 bg-blue-500 text-white select-none"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={checkAnswers}
                    className="border px-3 py-1 bg-green-500 text-white select-none"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <div className="select-none grid grid-cols-12 p-6">
          <div className="col-span-12 bg-white font-bold border border-teal-500 p-6 text-center justify-between flex items-center">
            <span className="mx-auto">
              You scored {correct} out of {questions.length}
            </span>
            <button
              onClick={restartGame}
              className="border px-3 py-1 bg-teal-500 text-white select-none"
            >
              Play Again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
