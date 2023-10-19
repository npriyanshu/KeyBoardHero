import { useContext, useEffect, useRef } from "react";
import countdownTimer from "../timerFunc";
import Customize from "./CustomizeTime";
import { StatesConstext } from "../Contexts/StateContextProvider";
// import { generate } from "random-words";
import easyToTypeWords from "../assets/easyWords";
const Home = () => {
  const {
    para,
    setPara,
    userInput,
    setUserInput,
    isCompleted,
    setIsCompleted,
    timer,
    setTimer,
    maxTime,
    setMaxTime,
    retry,
    setRetry,
    setWpm,
    setCpm,
    charIndex,
    setCharIndex,
    mistakes,
    setMistakes,
    setAccuracy,
    lightTheme,
  } = useContext(StatesConstext);

  const inpRef = useRef();
  const paraRef = useRef();
  const timerRef = useRef(null);

  function getRandomWords(count) {
    if (count <= 0) return [];
  
    const words = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * easyToTypeWords.length);
      words.push(easyToTypeWords[randomIndex]);
    }
  
    return words;
  }

  const randomParagraph = () => {
    // const words = generate(70);
    const words = getRandomWords(80);
    const newPara = words.join(" ");
    setPara(newPara);
  };

  const inputHandler = (e) => {
    setUserInput(e.target.value);

    // Starting the timer if it's not already running
    if (!timerRef.current && !isCompleted) {
      const newTimer = countdownTimer(timer, (curTime) => {
        setTimer(curTime);
      });
      timerRef.current = newTimer;
    }
  };

  

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimer(maxTime);
  };
  

  const calculateCPM = () => {
    const charactersTyped = Math.max(userInput.length - mistakes, 0); // Adjusted characters typed
    const elapsedTime = maxTime - timer; // Elapsed time in seconds
  
    // Handle division by zero (when elapsedTime is 0)
    if (elapsedTime === 0) {
      return 0; // You can choose to return 0 or handle it differently
    }
  
    const cpmValue = Math.round((charactersTyped / elapsedTime) * 60); // Adjusted CPM calculation
    return cpmValue;
  };
  
  
  const calculateWPM = () => {
    const wordsTyped = Math.max(userInput.trim().split(/\s+/).length - mistakes, 0); // Adjusted words typed
    const elapsedTime = maxTime - timer; // Elapsed time in seconds
  
    // Handle division by zero (when elapsedTime is 0)
    if (elapsedTime === 0) {
      return 0; // You can choose to return 0 or handle it differently
    }
  
    const wpmValue = Math.round((wordsTyped / elapsedTime) * 60); // Adjusted WPM calculation
    return wpmValue;
  };
  //accuracy
  const calculateAccuracy = () => {
    const charactersTyped = userInput.length; // Total characters typed
    const correctCharacters = charactersTyped - mistakes; // Correct characters typed
  
    if (charactersTyped === 0) {
      return 100; // When no characters are typed, accuracy is 100%
    }
  
    const accuracyPercentage = (correctCharacters / charactersTyped) * 100;
    return accuracyPercentage.toFixed(2); // Return accuracy as a percentage with two decimal places
  };
  
  

  useEffect(() => {
    setIsCompleted(false);
    setRetry(false);
    resetTimer()


    setWpm(0);
    setCpm(0);

    setUserInput("");

    setTimer(maxTime);
    setCharIndex(0);

    setMistakes(0);
    randomParagraph();
    document.addEventListener("keydown", () => {
      if (inpRef.current) {
        inpRef.current.focus();
      }
    });
        //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry, maxTime]);

  useEffect(() => {
    if (paraRef.current) {
      let characters = paraRef.current.querySelectorAll("span");
      let typedChar = userInput.split("");

      if (charIndex === typedChar.length - 1) {
        if (characters[charIndex].textContent === typedChar[charIndex]) {
          characters[charIndex].classList.add("correct");
        } else {
          characters[charIndex].classList.add("incorrect");
          setMistakes((prev) => prev + 1);
        }
        characters.forEach((span) => {
          span.classList.remove("active");
        });
        setCharIndex((prev) => prev + 1);
        characters[charIndex].classList.add("active");
      }

      characters.forEach((span, index) => {
        if (userInput.length === 0) {
          span.classList.remove("active", "incorrect", "correct");
        }
        if (index < charIndex) {
          span.classList.add("correct");
        } else {
          span.classList.remove("correct");
        }
        if (index === charIndex) {
          span.classList.add("active");
        } else {
          span.classList.remove("active");
        }
        if (typedChar[index] === span.textContent) {
          span.classList.remove("incorrect");
        }
        if (charIndex === characters.length) {
          setIsCompleted(true);
        }
      });
    }
        //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, userInput]);

  useEffect(() => {
    if (timer === 0) {
      setIsCompleted(true);
      const wpmValue = calculateWPM();
      const cpmValue = calculateCPM();
      const accuracyValue = calculateAccuracy();
      setWpm(wpmValue);
      setCpm(cpmValue);  
      setAccuracy(accuracyValue);
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, isCompleted]);

  useEffect(() => {
    if (!isCompleted) {
      const handleBackspace = (e) => {
        let characters = paraRef.current.querySelectorAll("span");
        if (e.keyCode === 8 && charIndex > 0) {
          characters[charIndex].classList.remove("incorrect", "correct");
          if (mistakes > 0) {
            setMistakes((prev) => prev - 1);
          }
          setCharIndex(charIndex - 1);
          setUserInput(userInput.slice(0, -1));
          e.preventDefault();
        }
        if (e.key === "Tab" || e.keyCode === 9) {
          e.preventDefault();
          setRetry(true);
          resetTimer(); // Reset the timer on Tab press
        }
      };

      window.addEventListener("keydown", handleBackspace);

      return () => {
        window.removeEventListener("keydown", handleBackspace);
      };
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, userInput, isCompleted, mistakes]);




  return (
    <div className={`wrapper ${lightTheme ? 'light' : ''}`}>
      <Customize setMaxTime={setMaxTime} setRetry={setRetry}/>

      <input
        disabled={isCompleted}
        id="input-Tag"
        type="text"
        className="input-field"
        ref={inpRef}
        value={userInput}
        onChange={(e) => {
          inputHandler(e);
        }}
        autoComplete="off"
      />
      <div className="content-box">
        <div className="typing-text" onClick={() => inpRef.current.focus()}>
          {para !== null ? (
            <p ref={paraRef}>
              {para.split("").map((char, idx) => (
                <span key={idx}>{char}</span>
              ))}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
