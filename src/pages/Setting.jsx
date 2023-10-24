import { useContext, useEffect } from "react"
import { StatesConstext } from "../Contexts/StateContextProvider"
import { useNavigate } from "react-router-dom";

const Setting = () => {
  let navigate = useNavigate();
const {maxTime, setIsCompleted, setTimer,lightTheme} = useContext(StatesConstext);


  useEffect(() => {
    const handleListner =(e)=>{
      if (e.key === "Tab" || e.keyCode === 9) {
        e.preventDefault();
        setTimer(maxTime);
        setIsCompleted(false)
        navigate('/')
      }
    }
    window.addEventListener("keydown", handleListner);
    return () => {
      window.removeEventListener("keydown", handleListner);
    }
 //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div style={{
      width:'100vw',
      height:'70vh',
      background:'#0c0d11'
    }} className={lightTheme?'light':''}>Setting</div>
  )
}

export default Setting