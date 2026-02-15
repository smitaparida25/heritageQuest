import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";

const stateNames = {
  INAN: "Andaman and Nicobar", INAP: "Andhra Pradesh", INAR: "Arunachal Pradesh",
  INAS: "Assam", INBR: "Bihar", INCH: "Chandigarh", INCT: "Chhattisgarh",
  INDH: "Dadra and Nagar Haveli", INDL: "Delhi", INGA: "Goa", INGJ: "Gujarat",
  INHP: "Himachal Pradesh", INHR: "Haryana", INJH: "Jharkhand", INJK: "Jammu & Kashmir",
  INKA: "Karnataka", INKL: "Kerala", INLA: "Ladakh", INLD: "Lakshadweep",
  INMH: "Maharashtra", INML: "Meghalaya", INMN: "Manipur", INMP: "Madhya Pradesh",
  INMZ: "Mizoram", INNL: "Nagaland", INOR: "Odisha", INPB: "Punjab",
  INPY: "Puducherry", INRJ: "Rajasthan", INSK: "Sikkim", INTG: "Telangana",
  INTN: "Tamil Nadu", INTR: "Tripura", INUP: "Uttar Pradesh", INUT: "Uttarakhand",
  INWB: "West Bengal"
};

const quizData = {
  INAP: [
    { question: "What is the capital of Andhra Pradesh?", options: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"], correct: 1 },
    { question: "Which temple is famous in Tirumala?", options: ["Brahma Temple", "Tirumala Temple", "Konark Temple", "Puri Temple"], correct: 1 },
    { question: "Andhra Pradesh is famous for?", options: ["Silk", "Spices", "Tea", "Coffee"], correct: 0 },
  ],
  INAR: [
    { question: "What is the capital of Arunachal Pradesh?", options: ["Itanagar", "Naharlagun", "Tawang", "Ziro"], correct: 0 },
    { question: "Which tribe is famous in Arunachal?", options: ["Naga", "Apatani", "Mizo", "Garo"], correct: 1 },
  ],
  INAS: [
    { question: "What is the capital of Assam?", options: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"], correct: 0 },
    { question: "Kaziranga National Park is famous for?", options: ["Tigers", "One-horned Rhinos", "Elephants", "Lions"], correct: 1 },
  ],
  INBR: [
    { question: "What is the capital of Bihar?", options: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"], correct: 0 },
    { question: "Which ancient university is in Bihar?", options: ["Nalanda", "Taxila", "Varanasi", "Kanchi"], correct: 0 },
  ],
  INGA: [
    { question: "What is the capital of Goa?", options: ["Margao", "Panaji", "Vasco da Gama", "Ponda"], correct: 1 },
    { question: "Goa is famous for its?", options: ["Beaches", "Mountains", "Deserts", "Forests"], correct: 0 },
  ],
  INGJ: [
    { question: "What is the capital of Gujarat?", options: ["Ahmedabad", "Surat", "Gandhinagar", "Vadodara"], correct: 2 },
    { question: "Statue of Unity is located in?", options: ["Ahmedabad", "Surat", "Kevadia", "Gandhinagar"], correct: 2 },
  ],
  INHP: [
    { question: "What is the capital of Himachal Pradesh?", options: ["Shimla", "Dharamshala", "Manali", "Kullu"], correct: 0 },
    { question: "Which river flows through Shimla?", options: ["Beas", "Sutlej", "Ravi", "Yamuna"], correct: 1 },
  ],
  INHR: [
    { question: "What is the capital of Haryana?", options: ["Gurgaon", "Faridabad", "Chandigarh", "Panipat"], correct: 2 },
    { question: "Haryana is known as?", options: ["Rice Bowl", "Milk Bowl", "Cotton Bowl", "Sugar Bowl"], correct: 1 },
  ],
  INJK: [
    { question: "What is the summer capital of Jammu & Kashmir?", options: ["Jammu", "Srinagar", "Leh", "Kashmir"], correct: 1 },
    { question: "Dal Lake is in?", options: ["Jammu", "Srinagar", "Leh", "Pahalgam"], correct: 1 },
  ],
  INKA: [
    { question: "What is the capital of Karnataka?", options: ["Mysore", "Bangalore", "Mangalore", "Hubli"], correct: 1 },
    { question: "Hampi is located in?", options: ["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra"], correct: 2 },
  ],
  INKL: [
    { question: "What is the capital of Kerala?", options: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"], correct: 1 },
    { question: "Kerala is known as?", options: ["God's Own Country", "Land of Rivers", "Blue Mountains", "Spice Garden"], correct: 0 },
  ],
  INMH: [
    { question: "What is the capital of Maharashtra?", options: ["Pune", "Mumbai", "Nagpur", "Nashik"], correct: 1 },
    { question: "Ajanta Caves are in?", options: ["Maharashtra", "Karnataka", "Madhya Pradesh", "Odisha"], correct: 0 },
  ],
  INMP: [
    { question: "What is the capital of Madhya Pradesh?", options: ["Indore", "Bhopal", "Jabalpur", "Gwalior"], correct: 1 },
    { question: "Khajuraho is famous for?", options: ["Temples", "Caves", "Forts", "Stupas"], correct: 0 },
  ],
  INRJ: [
    { question: "What is the capital of Rajasthan?", options: ["Jodhpur", "Jaipur", "Udaipur", "Kota"], correct: 1 },
    { question: "Which city is known as Pink City?", options: ["Jodhpur", "Jaipur", "Udaipur", "Bikaner"], correct: 1 },
  ],
  INTN: [
    { question: "What is the capital of Tamil Nadu?", options: ["Coimbatore", "Madurai", "Chennai", "Salem"], correct: 2 },
    { question: "Meenakshi Temple is in?", options: ["Chennai", "Madurai", "Trichy", "Rameshwaram"], correct: 1 },
  ],
  INUP: [
    { question: "What is the capital of Uttar Pradesh?", options: ["Agra", "Lucknow", "Varanasi", "Kanpur"], correct: 1 },
    { question: "Taj Mahal is in?", options: ["Delhi", "Agra", "Lucknow", "Varanasi"], correct: 1 },
  ],
  INUT: [
    { question: "What is the capital of Uttarakhand?", options: ["Haridwar", "Dehradun", "Nainital", "Rishikesh"], correct: 1 },
    { question: "Char Dham Yatra includes?", options: ["Haridwar", "Rishikesh", "Kedarnath", "All of these"], correct: 3 },
  ],
  INWB: [
    { question: "What is the capital of West Bengal?", options: ["Kolkata", "Howrah", "Durgapur", "Asansol"], correct: 0 },
    { question: "Howrah Bridge is in?", options: ["Delhi", "Kolkata", "Mumbai", "Chennai"], correct: 1 },
  ],
};

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stateName = stateNames[id] || "State";
  
  const questions = quizData[id] || [
    { question: `What is ${stateName} known for?`, options: ["Culture", "History", "Food", "All of the above"], correct: 3 },
    { question: `What is the capital of ${stateName}?`, options: ["City A", "City B", "City C", "City D"], correct: 0 },
    { question: `Famous dish of ${stateName}?`, options: ["Biryani", "Dosa", "Naan", "Idli"], correct: 0 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setTimeout(() => {
      if (index === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h1>Quiz - {stateName}</h1>
        
        {showScore ? (
          <div className="score-section">
            <h2>Quiz Completed!</h2>
            <p className="score-text">Your Score: {score} / {questions.length}</p>
            <p className="score-message">
              {score === questions.length ? "Perfect! 🎉" : 
               score >= questions.length / 2 ? "Good job! 👍" : "Keep learning! 📚"}
            </p>
            <div className="quiz-buttons">
              <button className="quiz-btn" onClick={restartQuiz}>Try Again</button>
              <button className="quiz-btn secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        ) : (
          <>
            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-section">
              <h2>{questions[currentQuestion].question}</h2>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`answer-btn ${selectedAnswer === index ? 'selected' : ''} ${
                    selectedAnswer !== null && index === questions[currentQuestion].correct ? 'correct' :
                    selectedAnswer === index && index !== questions[currentQuestion].correct ? 'wrong' : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
