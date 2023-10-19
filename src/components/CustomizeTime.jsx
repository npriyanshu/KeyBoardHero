import { useContext } from 'react';
import { AiFillClockCircle } from "react-icons/ai";
import { StatesConstext } from '../Contexts/StateContextProvider';
const Customize = () => {

  const {setMaxTime,setRetry,timer} = useContext(StatesConstext);

 const btnHandler =(e)=>{
  setMaxTime(Number(e.target.innerText))
  localStorage.setItem('time',Number(e.target.innerText))
  setRetry(true)
 }
  return (
    <div className="customize">
      <div>
      <p style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <AiFillClockCircle size={20} />
        time : <b>{timer}</b>
      </p>
      </div>

      <div className="options">
        <button onClick={btnHandler}>15</button>
        <button onClick={btnHandler}>30</button>
        <button onClick={btnHandler}>60</button>
        <button onClick={btnHandler}>120</button>
      </div>
    </div>
  );
};

export default Customize;
