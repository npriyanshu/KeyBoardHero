import { useContext, useEffect, useState } from 'react'
import { auth } from "../firebaseConfig"
import { editProfile, getTests } from '../apis/FireStroreAPI';
import { StatesConstext } from '../Contexts/StateContextProvider';
import ProgressChart from './ProgressChart';
import findMaxWpm from '../helpers/MaxWpmFinder';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {setCurrentUser,currentUser} = useContext(StatesConstext)
    const [tests,setTests] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
      
     try {
        if(tests === null){
            getTests(setTests)
        }
        if(tests){
            editProfile(currentUser?.id,{
                topSpeed: findMaxWpm(tests)
            })
        }
     } catch (error) {
        console.log(error)
     }
     } , [tests,currentUser?.id,currentUser?.topSpeed]);

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Profile</h1>
           
            <div style={{marginTop:'20px'}} className='container'>
                
                {
                    tests?<ProgressChart tests={tests}/> : ''
                }
                
            </div>
            <button onClick={() => {
                auth.signOut();
                navigate('/login')
                localStorage.removeItem("userEmail");
                localStorage.removeItem("time");
                setCurrentUser(null);
            }}>Logout</button>
        </div>
    )
}

export default Profile