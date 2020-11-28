import { shuffleAnswers } from './utils'
export {}


export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type AllQuestions = Question & {answers: string[]}

export enum Difficulty  {
    EASY = 'easy',
    MEDIUM = 'medium', 
    HARD = 'hard'

} 

export const fetchQuestions = async (totalQuestions: number, difficulty: Difficulty)=> {
    const endpoint = `https://opentdb.com/api.php?amount=10&type=multiple`; 
    const data = await(await fetch(endpoint)).json(); 
    return data.results.map((question: Question) => (
        {
            ...question,
            answers:  shuffleAnswers([...question.incorrect_answers, question.correct_answer])
        }  
    ))
}