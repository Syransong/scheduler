import React, { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  
  return {mode};
};

//take in an intial mode ex. empty, show, create/edit, saving/deleting, confirm  
// mode is a stateful variable 
// set the mode state with the intial mode provided 
// return an object with a mode property 