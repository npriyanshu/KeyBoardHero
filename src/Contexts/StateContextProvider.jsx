import PropTypes from "prop-types";
import { createContext, useState } from "react";


export const StatesConstext = createContext({});

 const StateProvider = ({ children }) => {
  const [para, setPara] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [mistakenWords, setMistakenWords] = useState([]);
  const [retry, setRetry] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [maxTime, setMaxTime] = useState(localStorage.getItem("time") || 30);
  const [timer, setTimer] = useState(maxTime);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [typingTime, setTypingTime] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [mistakesCollection, setMistakesCollection] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [prevTotalTime,setPrevTotalTime] = useState(0);

  return <StatesConstext.Provider value={{ para,
    setPara,
    userInput,
    setUserInput,
    retry,
    setRetry,
    charIndex,
    setCharIndex,
    mistakes,
    setMistakes,
    maxTime,
    setMaxTime,
    timer,
    setTimer,
    wpm,
    setWpm,
    cpm,
    setCpm,
    isCompleted,
    setIsCompleted,
    accuracy,
    setAccuracy
    ,currentUser, 
    setCurrentUser,
    lightTheme,
    setLightTheme,
    mistakenWords,
    setMistakenWords,
    typingTime,
    setTypingTime,
    prevTotalTime,
    setPrevTotalTime,
    mistakesCollection,
    setMistakesCollection,
  }}
    >
    {children}
    </StatesConstext.Provider>;
};

StateProvider.propTypes = {
    children: PropTypes.any
  }

  export default StateProvider;