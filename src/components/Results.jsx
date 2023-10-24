import { useContext, useEffect } from "react";
import { StatesConstext } from "../Contexts/StateContextProvider";
import { editMistakes, editProfile, postTests } from "../apis/FireStroreAPI";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import toast from "react-hot-toast";

const Results = () => {
  const {
    currentUser,
    mistakes,
    wpm,
    cpm,
    setIsCompleted,
    setTimer,
    maxTime,
    accuracy,
    mistakenWords,
    mistakesCollection,
    lightTheme,
  } = useContext(StatesConstext);

  const updateTests = () => {
    // const tests = JSON.parse(localStorage.getItem("tests")) || [];

    const test = {
      mistakes: mistakes,
      wpm: wpm,
      cpm: cpm,
      userEmail: localStorage.getItem("userEmail"),
      time: maxTime,
      accuracy: accuracy,
      date: Date.now(),
      //YYYY MMM DD HH:mm:ss A    getCurrentTimeStamp('LLL')
    };
    postTests(test);
  };
  function countLetterFrequency(arr) {
    const frequency = {};
    arr.forEach((letter) => {
      if (letter in frequency) {
        frequency[letter]++;
      } else {
        frequency[letter] = 1;
      }
    });
    return frequency;
  }

  useEffect(() => {
    // console.log(currentUser)
    try {
      onAuthStateChanged(auth, (res) => {
        if (res?.accessToken) {
          if (currentUser?.topSpeed < wpm) {
            editProfile(currentUser?.id, {
              topSpeed: wpm,
              accuracy:accuracy,
            });
          }
         
            editProfile(currentUser?.id, {
              totalTests:Number(`${currentUser.totalTests?currentUser.totalTests+1:1}`),
            });
       
          updateTests();
          const Mstk =mistakesCollection.mistakenLetters?mistakesCollection.mistakenLetters:[];
          Mstk.push(countLetterFrequency(mistakenWords))
          if (Object.keys(Mstk).length > 0){
            editMistakes(mistakesCollection?.id,{
              mistakenLetters:Mstk
             })
          }
        }
      });
    } catch (err) {
      toast.error(err);
    }
  // console.log(mistakesCollection?.id)
    const handleListner = (e) => {
      if (e.key === "Tab" || e.keyCode === 9) {
        e.preventDefault();
        setTimer(maxTime);
        setIsCompleted(false);
      }
    };
    window.addEventListener("keydown", handleListner);

    return () => {
      window.removeEventListener("keydown", handleListner);
    };
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.topSpeed,mistakesCollection?.id]);

  return (
    <div className={`results ${lightTheme?'light':''}`}>
      <div className="content">
        <ul className="result-details">
          <li className="mistake">
            <p>Mistakes:</p>
            <span>{mistakes}</span>
          </li>
          <li className="wpm">
            <p>WPM:</p>
            <span>{wpm}</span>
          </li>
          <li className="cpm">
            <p>CPM:</p>
            <span>{cpm}</span>
          </li>
          <li>
            <p>Accuracy</p>
            <span>{accuracy}%</span>
          </li>
        </ul>
        <button
          onClick={() => {
            setTimer(maxTime);
            setIsCompleted(false);
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;
