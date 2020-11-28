import React, { useState } from 'react';
import Question from './components/Question';
import { fetchQuestions, Difficulty, AllQuestions } from './API';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// export type Event = {
//   e.currentTarget.className: string
// }

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<AllQuestions[]>([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [started, setStarted] = useState(false);
  // const [ successColor, setSuccesColor ] = useState<Event>("")

  console.log(questions, 'questions');

  const startTrivia = async () => {
    setLoading(true);
    setStarted(true)
    setNumber(number);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setUserAnswers([]);
    setScore(0);
    setGameOver(false);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = answer === questions[number].correct_answer;
      // const snapShot = questions[number].question
      // console.log(snapShot, 'questions99');
      
      
      if (correct) {
        setScore((prev) => prev + 1);
        
      
          // e.currentTarget.className = "btn btn-success"
        

        // setSuccesColor("btn btn-success")
      }

      

      // console.log(number, 'number');
      
    

      console.log(correct);
      console.log(score, 'score');
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
      // setUserAnswers([answerObj])
    }
  };

  console.log(userAnswers.length, 'userAnswers.length');

  console.log(userAnswers, 'userAnswers');

  const moveToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.className = "btn btn-success"
    const next = number + 1;
    if (next === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next);
      e.currentTarget.className = ""
    }
    
  };
  // console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  console.log(userAnswers, 'userAnswerssssssss99999999999');
  console.log(userAnswers[number], 'userAnswers[number]');
  console.log(number, 'number');
  console.log(userAnswers[0], 'userAnswers[1]');
  
  return (
    <div className='mt-5'>
      <div className='container d-flex flex-column'>
        {!loading || gameOver ? (
          <button
            style={{ marginRight: '510px', marginLeft: '510px' }}
            className='btn btn-primary'
            onClick={startTrivia}
          >
            Start
          </button>
        ) : null}

        <p
          style={{
            marginRight: '510px',
            marginLeft: '533px',
            marginTop: '29px',
          }}
        >
          {!loading && started ? 
          (<>Score: {score}</>)
          : null}
          
        </p>
        {loading? (
          <p style={{ marginRight: '510px', marginLeft: '510px' }}>
            Loading....
          </p>
        ) : null}

        {!loading && !gameOver ? (  
          <Question
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            
          />
        ) : null}

        {!loading && !gameOver? (
          <button
          onClick={moveToNext}
          style={{ marginRight: '510px', marginLeft: '510px', marginTop: '15px' }}
          className="btn btn-success"
        >
          Next
        </button>
        ) : null}
        
      </div>
    </div>
  );
};

export default App;
