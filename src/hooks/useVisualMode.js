import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (nextMode, replace = false) {
    setMode(nextMode);
    
    replace
      ? setHistory(prev => [...prev])
      : setHistory(prevMode => [...prevMode, nextMode]);
  };
  
  function back () {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };
  return {mode, transition, back};
};

