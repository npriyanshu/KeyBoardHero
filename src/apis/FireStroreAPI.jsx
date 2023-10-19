import toast from "react-hot-toast";
import { firestore } from "../firebaseConfig"
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
  } from "firebase/firestore";

const testsRef = collection(firestore,'tests')
const userRef = collection(firestore,'users')
const mistakeRef = collection(firestore,'mistakes')

// post something
export const postTests = (object)=>{
addDoc(testsRef,object)
.then(()=>{
    toast.success('test result saved');
})
.catch((err)=>console.log(err))
}

// post mistaken words
export const postMistakes = (object)=>{
addDoc(mistakeRef,object)
.then(()=>{
    toast.success('mitaken words saved');
})
.catch((err)=>console.log(err))
}

// //get all posts
export const getTests = (setTests) => {
    onSnapshot(testsRef, (snapshot) => {
        const sortedData = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => {return item.userEmail === localStorage.getItem("userEmail");})
            .sort((a, b) =>{
               return  new Date(a.date) - new Date(b.date)
            }); // Sorting in descending order
            if(sortedData.length===0){
                setTests([])
            }
            else{
              setTests(sortedData);
            }
          });
        };
        

        
        //post userdata
        export const postUserData = (object) =>{
          addDoc(userRef,object)
          .then(()=>{
            toast.success('User Data Posted successfully');
    })
    .catch((err)=>console.log(err))
}

//get current user
export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (snapshot) => {
    
    let user =   snapshot.docs
      .map((doc) => {
        return { ...doc.data(), id: doc.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0];
        
        setCurrentUser(user);
  });
};

//get mistaken words
export const getMistakenWords = (setMistakes) => {
  onSnapshot(mistakeRef, (snapshot) => {
    
    let user =   snapshot.docs
      .map((doc) => {
        return { ...doc.data(), id: doc.id };
        })
        .filter((item) => {
          return item.userEmail === localStorage.getItem("userEmail");
        })[0];
        
        setMistakes(user);
  });
};

//edit profile
export const editProfile = (docId, payload) => {
  let userToEdit = doc(userRef,docId);

  updateDoc(userToEdit, payload)
    .then(() => {
      // toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

//edit mistakes
export const editMistakes = (docId, payload) => {
  let userToEdit = doc(mistakeRef,docId);

  updateDoc(userToEdit, payload)
    .then(() => {
      // toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};



