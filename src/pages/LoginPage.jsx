import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";

const LoginPage = () => {
  let navigate = useNavigate();
  useEffect(()=>{
  try {
    onAuthStateChanged(auth,(res)=>{
      if(res?.accessToken){
        navigate('/')
      } 
    })
  } catch (error) {
    console.log(error)
  }
  })
  return <Login/>

}

export default LoginPage