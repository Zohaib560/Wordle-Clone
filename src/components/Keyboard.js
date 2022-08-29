import React, { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../App';
import Key from './Key';

const Keyboard = () => {
  const letters1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const letters2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const letters3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  const { onEnter, onDelete, onLetter } = useContext(AppContext);

  // eslint-disable-next-line
  const handleKeyboard = useCallback((e) => {
    if(e.key === "Enter"){
      onEnter();
    } 
    else if (e.key === "Backspace"){
      onDelete();
    } 
    else {
      const input = e.key.toLowerCase();
      if (letters1.includes(input) || letters2.includes(input) || letters3.includes(input)){
        onLetter(input);
      }
    }
  });

  useEffect( () => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    }
  }, [handleKeyboard])

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {letters1.map(letter => {
          return <Key key={letter} val={letter}/>;
        })}
      </div>
      <div className="line2">
        {letters2.map(letter => {
          return <Key key={letter} val={letter}/>;
        })}
      </div>
      <div className="line3">
        <Key val={"ENTER"} />
        {letters3.map(letter => {
          return <Key key={letter} val={letter}/>;
        })}
        <Key val={"DELETE"} />
      </div>
    </div>
  )
}

export default Keyboard