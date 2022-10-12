import { createContext, useReducer } from "react";
import questions from "../data/questions";

const STAGES = ["Start", "Playing", "End"];

//Propriedades referentes ao jogo
const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
};

const quizReducer = (state, action) => {
    
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        //Spread Operator
        ...state,
        gameStage: STAGES[1],
      };
    case "REORDER_QUESTIONS":
      const reorderQuestions = questions.sort(() => {
        return Math.random() - 0.5;
      });
      return {
        //Spread Operator
        ...state,
        questions: reorderQuestions,
      };

    case "CHANGE_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      // end game não pode ser constante

      let endGame = false;

      if (!questions[nextQuestion]) {
        endGame = true;
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : state.gameStage,
        answerSelected: false,
      };
    case "NEW_GAME":
      return initialState;

    case "CHECK_ANSWER":
      // aqui impedimos que selecionem varias vezes 
      if (state.answerSelected) return state;

      const answer = action.payload.answer;
      const option = action.payload.option;
      let correctAnswer = 0;

      if (answer === option) correctAnswer = 1;

      return {
        ...state,
        score: state.score + correctAnswer,
        answerSelected: option,
      };

    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

/*
Context: nós importamos nos componentes em que será utilizado (Consumir), quem eu quero prover os dados

Provider: é importado no local onde ele ira prover as informações para os componentes (Quem Recebe)

Provider: recebe "children" pois ele irá abraçar varios componentes.

Provider: é importante add value, pois o contexto não deve ser vazio, é necessario algum valor para compartilhar 
*/

/* 
    useReducer: Com ele consigo gerenciar estados mais complexos e fazer alterações com bases em ações do meu projeto

    Quando usamos o reducer podemos ter um estagio inicial onde podemos já carregar as perguntas, pontuação, no caso deste projeto

*/
