
import { Link } from "react-router-dom"
import {BiSolidMessageAltDetail,BiLogoGithub} from 'react-icons/bi'
import { useContext } from "react"
import { StatesConstext } from "../Contexts/StateContextProvider"
const Footer = () => {
  const {lightTheme} = useContext(StatesConstext);
  return (
    <footer id="footer" className={lightTheme?'light':''}>
<div>

    <Link style={{color:`${lightTheme?'black':'white'}`}}>
    <BiSolidMessageAltDetail size={22}/>
    contacts
    </Link>
    <Link style={{color:`${lightTheme?'black':'white'}`}}>
    <BiLogoGithub size={22}/>
    github
    </Link>
</div>
    </footer>
  )
}

export default Footer