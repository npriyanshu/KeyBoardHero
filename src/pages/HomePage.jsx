import { useContext, useEffect} from "react";
import Home from "../components/Home";
import Results from "../components/Results";
import { StatesConstext } from "../Contexts/StateContextProvider";



const HomePage = () => {
  const {setTimer,setIsCompleted,maxTime}= useContext(StatesConstext)
    const {isCompleted} = useContext(StatesConstext);
    
    useEffect(()=>{
      return ()=>{
        setTimer(maxTime);
        setIsCompleted(false)
      }
    },[maxTime,setIsCompleted,setTimer])
  return (

  !isCompleted? <Home/> : <Results/>
  
  
  );
};


export default HomePage;
