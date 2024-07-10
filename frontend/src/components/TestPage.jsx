import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/testpage.css";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!sessionStorage.getItem("userId")) {
        navigate("/login");
      }
      try {
        const response = await axios.get("http://localhost:5076/api/Questions");
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
      }
    };
    fetchQuestions();
  }, [navigate]);

  const handleResponseChange = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseArray = questions.map(
        (question) => responses[question.id] || 0
      );

      let resultArray = [];
      for (let i = 0; i < responseArray.length; i += 10) {
        const chunkSum = responseArray
          .slice(i, i + 10)
          .reduce((sum, value) => sum + value, 0);
        resultArray.push(chunkSum);
      }
      console.log(resultArray);
      const typeMapping = [
        "Type 1: The Reformer",
        "Type 2: The Helper",
        "Type 3: The Achiever",
        "Type 4: The Individualist",
        "Type 5: The Investigator",
        "Type 6: The Loyalist",
        "Type 7: The Enthusiast",
        "Type 8: The Challenger",
        "Type 9: The Peacemaker",
      ];

      let maxIndex = 0;
      let maxValue = resultArray[0];

      for (let i = 1; i < resultArray.length; i++) {
        if (resultArray[i] > maxValue) {
          maxValue = resultArray[i];
          maxIndex = i;
        }
      }

      setResult(typeMapping[maxIndex]);

      console.log(typeMapping[maxIndex]);
      let id = sessionStorage.getItem("userId");
      const body = {
        userId: id,
        responseValues: responseArray,
        result: typeMapping[maxIndex],
      };
      console.log(body);
      await axios.post(
        "http://localhost:5076/api/Responses/SubmitResponses",
        body
      );
    } catch (error) {
      console.error("Error submitting responses:", error);
      setError("Error submitting responses. Please try again later.");
    }
  };

  if (result) {
    return (
      <div className="result-container">
        <div className="result">
          Your personality type is:{" "}
          <span className="result-text">{result}</span>
        </div>
        <button onClick={() => navigate("/")} className="home-button">
          Go to Homepage
        </button>
      </div>
    );
  }

  const completionPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="test-page-container">
      <h1>Enneagram Test</h1>
      <p>
        Score the statements according to how true or applicable they are to
        you.
      </p>
      <p>Completed: {completionPercentage.toFixed(1)}%</p>
      <form onSubmit={handleSubmit} className="test-form">
        {questions.length > 0 && (
          <div
            key={questions[currentQuestionIndex].id}
            className="question-container fade-in"
          >
            <p className="question-text">
              {questions[currentQuestionIndex].questionText}
            </p>
            <div className="options">
              <label className="option-label">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex].id}`}
                  value="4"
                  checked={responses[questions[currentQuestionIndex].id] === 4}
                  onChange={() =>
                    handleResponseChange(questions[currentQuestionIndex].id, 4)
                  }
                />
                Agree Strongly
              </label>
              <label className="option-label">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex].id}`}
                  value="3"
                  checked={responses[questions[currentQuestionIndex].id] === 3}
                  onChange={() =>
                    handleResponseChange(questions[currentQuestionIndex].id, 3)
                  }
                />
                Agree Slightly
              </label>
              <label className="option-label">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex].id}`}
                  value="2"
                  checked={responses[questions[currentQuestionIndex].id] === 2}
                  onChange={() =>
                    handleResponseChange(questions[currentQuestionIndex].id, 2)
                  }
                />
                Disagree Slightly
              </label>
              <label className="option-label">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex].id}`}
                  value="1"
                  checked={responses[questions[currentQuestionIndex].id] === 1}
                  onChange={() =>
                    handleResponseChange(questions[currentQuestionIndex].id, 1)
                  }
                />
                Disagree Strongly
              </label>
            </div>
            <div className="navigation-buttons">
              {currentQuestionIndex > 0 && (
                <button type="button" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button type="submit">Submit</button>
              )}
            </div>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TestPage;
