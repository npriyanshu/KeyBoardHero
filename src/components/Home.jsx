import { useContext, useEffect, useRef } from "react";
import countdownTimer from "../helpers/timerFunc";
import Customize from "./CustomizeTime";
import { StatesConstext } from "../Contexts/StateContextProvider";
import easyToTypeWords from "../assets/easyWords";
import typingTimeCounter from "../helpers/typingTimeCounter";
import { editProfile, getCurrentUser } from "../apis/FireStroreAPI";

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
    setMistakenWords,
    typingTime,
    setTypingTime,
    currentUser,
    setCurrentUser,
    prevTotalTime,
    setPrevTotalTime
  } = useContext(StatesConstext);

  const inpRef = useRef();
  const paraRef = useRef();
  const timerRef = useRef(null);

  // Creating a new ref variable to hold the interval ID
  const typingTimerRef = useRef(null);

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
    const words = getRandomWords(80);
    const newPara = words.join(" ");
    setPara(newPara);
  };
  
  console.log(typingTime)

  const inputHandler = (e) => {
    setUserInput(e.target.value);

    if (!timerRef.current && !isCompleted) {
      const newTimer = countdownTimer(timer, (curTime) => {
        setTimer(curTime);
      });
      timerRef.current = newTimer;
    }

    if (!typingTimerRef.current && !isCompleted) {
      const newTime = typingTimeCounter(setTypingTime);
      typingTimerRef.current = newTime;
    }
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimer(maxTime);
  };

  const resetTypingTimeCounter = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setTypingTime(0);
  };

  const calculateCPM = () => {
    const charactersTyped = Math.max(userInput.length - mistakes, 0);
    const elapsedTime = maxTime - timer;

    if (elapsedTime === 0) {
      return 0;
    }

    const cpmValue = Math.round((charactersTyped / elapsedTime) * 60);
    return cpmValue;
  };

  const calculateWPM = () => {
    const wordsTyped = Math.max(
      userInput.trim().split(/\s+/).length - mistakes,
      0
    );
    const elapsedTime = maxTime - timer;

    if (elapsedTime === 0) {
      return 0;
    }

    const wpmValue = Math.round((wordsTyped / elapsedTime) * 60);
    return wpmValue;
  };




  const calculateAccuracy = () => {
    const charactersTyped = userInput.length;
    const correctCharacters = charactersTyped - mistakes;

    if (charactersTyped === 0) {
      return 100;
    }

    const accuracyPercentage = (correctCharacters / charactersTyped) * 100;
    return accuracyPercentage.toFixed(2);
  };


// console.log('total time :'+currentUser.totalTime)
  useEffect(() => {
    try {
      getCurrentUser(setCurrentUser);
      setWpm(0);
      setCpm(0);
      setUserInput("");
      setTimer(maxTime);
      setCharIndex(0);
      setMistakes(0);
      randomParagraph();
      setIsCompleted(false);
      setRetry(false);
      resetTimer();
      clearInterval(typingTimerRef.current)
      typingTimerRef.current = null
      setPrevTotalTime(currentUser.totalTime ? currentUser.totalTime :0)
      
    console.log('prev time '+ prevTotalTime)
    resetTypingTimeCounter();
    setMistakenWords([]);
  
   } catch (error) {
    console.log(error)
   }
    document.addEventListener("keydown", () => {
      if (inpRef.current) {
        inpRef.current.focus();
      }
    });
    return ()=>{
      resetTypingTimeCounter();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry, maxTime,prevTotalTime,currentUser?.totalTime]);





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
          setMistakenWords((prev) => [
            ...prev,
            characters[charIndex].textContent.trim() === " "
              ? " "
              : characters[charIndex].textContent,
          ].filter((item) => item !== " "));
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
    try {
        const wpmValue = calculateWPM();
        const cpmValue = calculateCPM();
        const accuracyValue = calculateAccuracy();
        setWpm(wpmValue);
        setCpm(cpmValue);
        setAccuracy(accuracyValue);

        if (timer === 0) {
          setIsCompleted(true);
          
          editProfile(currentUser?.id,
            {
              totalTime:typingTime+prevTotalTime,
            })
      }
    } catch (error) {
      console.log(error)
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, isCompleted]);
console.log(currentUser)
  useEffect(() => {

    if (!isCompleted) {
      const handleBackspace = async(e) => {
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

           editProfile(currentUser?.id,
            {
              totalTime:typingTime+prevTotalTime
            })
          resetTimer();
          resetTypingTimeCounter();
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
    <div className={`wrapper ${lightTheme ? "light" : ""}`}>
      <Customize setMaxTime={setMaxTime} setRetry={setRetry} />

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
              )
            )}
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
