
// import  { useEffect, useState, useRef } from "react";
// import { paragraphs } from "./paragraph";

// const App = () => {
//   const [para, setPara] = useState(null);
//   const [inpVal, setInpVal] = useState('');
//   // const [typedChars, setTypedChars] = useState([]);
//   const [charIndex, setCharIndex] = useState(0);
//   const inpRef = useRef();
//   const paraRef = useRef();

//   const randomParagraph = () => {
//     let randIndex = Math.floor(Math.random() * paragraphs.length);
//     setPara(paragraphs[randIndex]);
//   };


//   useEffect(() => {
//     randomParagraph();
//     document.addEventListener('keydown',()=>inpRef.current.focus())
//   }, []);

//   useEffect(() => {
//     if (paraRef.current) {
//       let characters = paraRef.current.querySelectorAll('span');
//       let typedChar = inpVal.split('');
  
//       if (charIndex === typedChar.length - 1) {
//         // Handle when typing is complete
//         if (characters[charIndex].textContent === typedChar[charIndex]) {
//           characters[charIndex].classList.add('correct');
//         } else {
//           characters[charIndex].classList.add('incorrect');
//         }
//         characters.forEach(span => {
//           span.classList.remove('active');
//         });
//         setCharIndex(prev => prev + 1);
//         characters[charIndex].classList.add('active');
//       } else if (charIndex > typedChar.length) {
//         // Handle going back a character (backspace)
//         setCharIndex(prev => prev - 1);
//         characters[charIndex].classList.remove('correct', 'incorrect');
//         characters.forEach(span => {
//           span.classList.remove('active');
//         });
//         characters[charIndex].classList.add('active');
//       } else {
//         // Handle regular character input
//         if (characters[charIndex].textContent === typedChar[charIndex]) {
//           characters[charIndex].classList.add('correct');
//         } else {
//           characters[charIndex].classList.add('incorrect');
//         }
//         characters.forEach(span => {
//           span.classList.remove('active');
//         });
//         characters[charIndex].classList.add('active');
//         setCharIndex(prev => prev + 1);
//       }
//     }
//   }, [inpVal]);
  


//   return (
//     <div className="wrapper">
//       <input
//         id="input-Tag"
//         type="text"
//         className="input-field"
//         ref={inpRef}
//         value={inpVal}
//         onChange={(e)=>{
      
//           setInpVal(e.target.value);          
          
//         }}
//       />
//       <div className="content-box">
//         <div className="typing-text" onClick={() => inpRef.current.focus()}>
//           {para !== null ? (
//             <p ref={paraRef}>
//               {para.split("").map((char, idx) => (
//                 <span key={idx}>{char}</span>
//               ))}
//             </p>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="content">
//           <ul className="result-details">
//             <li className="time">
//               <p>Time Left:</p>
//               <span>
//                 <b>30</b>s
//               </span>
//             </li>
//             <li className="mistake">
//               <p>Mistakes:</p>
//               <span>34</span>
//             </li>
//             <li className="wpm">
//               <p>WPM:</p>
//               <span>Wpm</span>
//             </li>
//             <li className="cpm">
//               <p>CPM:</p>
//               <span>44</span>
//             </li>
//           </ul>
//           <button>Try Again</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;