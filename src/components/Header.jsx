import { Link } from 'react-router-dom'
import {BsKeyboardFill} from 'react-icons/bs'
import {BiSolidUser} from 'react-icons/bi'
import {AiTwotoneSetting} from 'react-icons/ai'
import {MdBrightnessMedium} from 'react-icons/md'

import logo from '../assets/da3tr2v-99a73f4b-3e33-43be-ba6f-a0a06d2fd729.png'
import { useContext, useEffect } from 'react'
import { StatesConstext } from '../Contexts/StateContextProvider'
import { getCurrentUser, getMistakenWords } from '../apis/FireStroreAPI'
const Header = () => {
  const {para,currentUser,setCurrentUser,lightTheme,setLightTheme,setMistakesCollection,mistakesCollection} = useContext(StatesConstext);
  useEffect(() => {
    if(currentUser === null || currentUser === undefined)
{
      getCurrentUser(setCurrentUser);
      getMistakenWords(setMistakesCollection);
    }
    
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  },[para,mistakesCollection?.mistakenLetters])
  return (
    <nav id="header" className={lightTheme?'light':''} >
     <div>
     <span className='logoContainer'>
        <img src={logo} alt="logo" />
        <h2>KeyBoardHero</h2>
      </span>
      <Link to={'/'} className={lightTheme?'svglight':'svgdark'}>
    <BsKeyboardFill size={28}/>
       </Link>
      <Link to={'/setting'} className={lightTheme?'svglight':'svgdark'}>
     <AiTwotoneSetting size={28}/>
       </Link>
     </div>

     <div>
      <Link to={'/profile'} style={{marginTop:"1rem"}} className={lightTheme?'svglight':'svgdark'}>
      <BiSolidUser size={28} />
      {
        currentUser?currentUser.name:''
      }
      </Link>
      <MdBrightnessMedium size={28}  onClick={()=>setLightTheme((prev)=>!prev)} className={lightTheme?'svglight':'svgdark'}/>
     </div>
    </nav>
  )
}

export default Header