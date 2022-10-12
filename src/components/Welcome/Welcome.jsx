import { useContext } from "react";
import { QuizContext } from "../../context/quiz";

import "./Welcome.css";
import Quiz from "../../img/quiz.svg";

const Welcome = () => {
  /*
    quizState: pego os valores
    dispatch: altero os valores
  */
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id="welcome">
      <h2>Seja Bem vindo</h2>
      <p>Clique no botão para iniciar</p>
      <img src={Quiz} alt="Imagem Quiz" />
      <button onClick={() => dispatch({ type: "CHANGE_STATE" })}>
        Iniciar
      </button>
    </div>
  );
};

export default Welcome;
