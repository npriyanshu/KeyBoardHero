import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "../components/Profile";
import { auth } from "../firebaseConfig";
import { StatesConstext } from "../Contexts/StateContextProvider";

const ProfilePage = () => {
  const { maxTime, setIsCompleted, setTimer,lightTheme } = useContext(StatesConstext);

  let navigate = useNavigate();
  useEffect(() => {
    try {
      onAuthStateChanged(auth, (res) => {
        if (!res?.accessToken) {
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    const handleListner = (e) => {
      if (e.key === "Tab" || e.keyCode === 9) {
        e.preventDefault();
        setTimer(maxTime);
        setIsCompleted(false);
        navigate("/");
      }
    };

    try {
      window.addEventListener("keydown", handleListner);
    } catch (error) {
      console.log(error);
    }

    return () => {
      window.removeEventListener("keydown", handleListner);
    };
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      } 
    }
    className={lightTheme?'light':''}
    >
      <Profile />
    </div>
  );
};

export default ProfilePage;
