import { Link } from "react-router-dom";
import { BsKeyboardFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { AiTwotoneSetting } from "react-icons/ai";
import { MdBrightnessMedium } from "react-icons/md";

import logo from "../assets/da3tr2v-99a73f4b-3e33-43be-ba6f-a0a06d2fd729.png";
import { useContext, useEffect } from "react";
import { StatesConstext } from "../Contexts/StateContextProvider";
import { getCurrentUser, getMistakenWords } from "../apis/FireStroreAPI";
const Header = () => {
  const {
    para,
    currentUser,
    setCurrentUser,
    lightTheme,
    setLightTheme,
    setMistakesCollection,
    mistakesCollection,
  } = useContext(StatesConstext);
  useEffect(() => {
    if (currentUser === null || currentUser === undefined) {
      getCurrentUser(setCurrentUser);
      getMistakenWords(setMistakesCollection);
    }

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [para, mistakesCollection?.mistakenLetters]);
  return (
    <nav id="header" className={lightTheme ? "light" : ""}>
      <div>
        <span className="logoContainer">
          <img src={logo} alt="logo" />
          <h2>KeyBoardHero</h2>
        </span>
        <Link to={"/"} >
          <BsKeyboardFill size={28} className={lightTheme ? "svglight" : "svgdark"} />
        </Link>
        <Link to={"/setting"} >
          <AiTwotoneSetting size={28} className={lightTheme ? "svglight" : "svgdark"}/>
        </Link>
      </div>

      <div>
        <Link
          to={"/profile"}
          style={{ marginTop: "1rem" }}
          
        >
          <BiSolidUser size={28} className={lightTheme ? "svglight" : "svgdark"}/>
          {currentUser ? currentUser.name : ""}
        </Link>
        <MdBrightnessMedium
          size={28}
          onClick={() => setLightTheme((prev) => !prev)}
          className={lightTheme ? "svglight" : "svgdark"}
        />
      </div>
    </nav>
  );
};

export default Header;
