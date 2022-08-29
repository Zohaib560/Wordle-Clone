import React, { useContext } from 'react';
import { AppContext } from "../App";

const Letter = ({ letterPos, attempt }) => {
    const { board, correctWord, boardPos } = useContext(AppContext);
    const letter = board[attempt][letterPos]

    const correct = correctWord[letterPos] === letter;
    const almost = !correct && letter !== '' && correctWord.includes(letter);
    const guessType = boardPos.attempt > attempt && (correct ? "correct" : almost ? "almost" : "wrong");
  return (
    <div className="letter" id={!guessType ? '' : guessType}> {letter} </div>
  )
}

export default Letter