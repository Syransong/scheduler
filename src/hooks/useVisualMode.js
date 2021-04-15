import React, { useState } from "react";

export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (nextMode) {
    setMode(nextMode);
    setHistory(prevMode => [...prevMode, nextMode]); //spread the history and add the next mode in history 
  };
  
  function back () {
    console.log("history", history);
    if (history.length > 1) {
      history.pop();
      console.log("popped history", history);
      setMode(history[history.length - 1]);
    }
  }
  return {mode, transition, back};
};

//take in an intial mode ex. empty, show, create/edit, saving/deleting, confirm  
// mode is a stateful variable 
// set the mode state with the intial mode provided 
// return an object with a mode property 
