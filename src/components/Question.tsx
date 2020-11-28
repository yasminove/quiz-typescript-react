import React from 'react';
import {AnswerObject} from '../App'
// export type Question = {
//   answers?: string[];
//   category: string;
//   correct_answer: string;
//   difficulty: string;
//   incorrect_answers: string[];
//   question: string;
//   type: string;
// };

// export type AnswerObject = {
//     question: string, 
//     answer: string, 
//     correct: boolean, 
//     correctAnswer: string
//   }




export type Question = {
  questionNum: number;
  totalQuestions: number;
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
};

type ButtonWrapper = {
  correct: boolean, 
  userClicked: boolean
}

const Question:React.FC<Question> = ({
  questionNum,
  totalQuestions,
  question,
  answers,
  userAnswer,
  callback})=> {
    console.log(questionNum, 'questionNum');
    console.log(totalQuestions, 'totalQuestions');
    
    console.log(userAnswer, 'usesANSWER');
    
    const correct = userAnswer?.correctAnswer;

    const userClicked = userAnswer?.answer;
    
    return (
        <div className="card card-body">
            <p dangerouslySetInnerHTML={{__html: question}} style={{marginLeft: '314px'}}></p>
            {answers.map((answer) => (
              
              <div style={{width: '10%', marginLeft: '470px', marginBottom: '5px'}}
                key={answer} 
            
              >
           
                <button disabled={userAnswer? true : false} value={answer} onClick={callback}      
                
                className={correct===answer && userClicked === answer ? "btn btn-success" : correct!==answer && userClicked === answer ? "btn btn-danger" : ""} >
                  <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
              </div>
            ))}
        </div>
    )
}

export default Question;