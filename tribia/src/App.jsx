import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Función para mezclar un array usando el algoritmo de Fisher-Yates
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    const initialQuestions = [
      {
        question: "¿Cuál es el logotipo de React?",
        options: [
          { text: "React", image: reactLogo },
          { text: "Vite", image: viteLogo }
        ],
        answer: "React"
      },
      {
        question: "¿Cuál es el logotipo de Vite?",
        options: [
          { text: "React", image: reactLogo },
          { text: "Vite", image: viteLogo }
        ],
        answer: "Vite"
      },
      {
        question: "¿Cuál es el lenguaje de programación más usado?",
        options: ["JavaScript", "Python"],
        answer: "JavaScript"
      },
      {
        question: "¿Cuál es el sistema operativo más usado?",
        options: ["Windows", "Linux"],
        answer: "Windows"
      },
      {
        question: "¿Cuál es el navegador más usado?",
        options: ["Chrome", "Firefox"],
        answer: "Chrome"
      },
      {
        question: "¿Cuál es el motor de búsqueda más usado?",
        options: ["Google", "Bing"],
        answer: "Google"
      }
    ];

    setQuestions(shuffleArray(initialQuestions));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option
    });
  };

  const handleSubmit = () => {
    if (selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="App">
      <h1>Cuestionario</h1>
      {!isQuizFinished ? (
        <div>
          <h2>{questions[currentQuestionIndex]?.question}</h2>
          {questions[currentQuestionIndex]?.options.map((option) => (
            <label key={option.text || option}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option.text || option}
                checked={selectedAnswers[currentQuestionIndex] === (option.text || option)}
                onChange={() => handleOptionChange(option.text || option)}
              />
              {option.image ? <img src={option.image} alt={option.text} style={{ width: '50px', height: '50px' }} /> : option}
            </label>
          ))}
          <button onClick={handleSubmit}>Enviar</button>
        </div>
      ) : (
        <h2>Tu puntuación: {score}/{questions.length}</h2>
      )}
    </div>
  );
}

export default App;