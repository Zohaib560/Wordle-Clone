import React, {useContext} from 'react'
import { AppContext } from "../App";

const Key = ({ val }) => {
  const { onDelete, onEnter, onLetter } = useContext(AppContext);
  
  const handleKeyInput = () => {
    if (val === "ENTER"){
      onEnter();
    }  
    else if (val === "DELETE"){
      onDelete();
    } 
    else {
      onLetter(val);
    }
  }

  return (
    <div className="key" id={val.length > 1 ? "big" : ""} onClick={handleKeyInput}>
      {val}
    </div>
  )
}

export default Key