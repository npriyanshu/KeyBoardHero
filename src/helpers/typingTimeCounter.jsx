export default function typingTimeCounter(setTime) {
  
    const timerInterval = setInterval(() => {
     
        setTime((prev)=>prev+1)
       
    }, 1000);
    
    return timerInterval
  }
  