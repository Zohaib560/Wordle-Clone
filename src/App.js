import './App.css';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useState, useEffect, createContext } from 'react';
import { emptyBoard, generateWordData } from './components/WordleUtility';

export const AppContext = createContext();

//Notes: The below are some comments abou new things I learned when making this app
//AppContext allows me to pass in the states here such as board to the components within the appcontext provider

function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [boardPos, setBoardPos] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set())
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordData().then((data) => {
      setWordSet(data.wordSet)
      setCorrectWord(data.todaysWord)
    })
  }, [])

  const onEnter = () => {
    if (boardPos.letterPos !== 5) return;
    let currWord = "";
    for(let i = 0; i < 5; i++){
      currWord += board[boardPos.attempt][i];
    }

    if (wordSet.has(currWord)){
      setBoardPos({attempt: boardPos.attempt + 1, letterPos: 0});
    }
    else {
      alert("Please enter a valid 5 letter word.");
    }

    if (currWord === correctWord){
      setBoardPos({...boardPos, attempt: 6});
      alert("You guessed the correct Word!\nRefresh for a new Word!");
    }
    else if (boardPos.attempt >= 5){
      alert(`You failed to guess the word. The correct word was ${correctWord}!\nRefresh the page for a new Word!`);
    }
  }

  const onDelete = () => {
    if (boardPos.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[boardPos.attempt][boardPos.letterPos - 1] = '';
    setBoard(newBoard);
    setBoardPos({...boardPos, letterPos: boardPos.letterPos - 1});
  }

  const onLetter = (val) => {
    if (boardPos.letterPos >= 5) return;
    const newBoard = [...board];
    newBoard[boardPos.attempt][boardPos.letterPos] = val;
    setBoard(newBoard);
    setBoardPos({...boardPos, letterPos: boardPos.letterPos + 1});
  }

  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>
      <div className="game">
      <AppContext.Provider value={{ board, setBoard, boardPos, setBoardPos, onDelete, onEnter, onLetter, correctWord }}> 
        <Board />
        <Keyboard />
      </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
