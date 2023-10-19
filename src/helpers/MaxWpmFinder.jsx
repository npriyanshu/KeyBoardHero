export default function findMaxWpm(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return null; // Return null if the input is not an array or is empty.
    }
  
    let maxWpm = data[0].wpm; // Initialize maxWpm with the first object's wpm.
  
    for (let i = 1; i < data.length; i++) {
      if (data[i].wpm > maxWpm) {
        maxWpm = data[i].wpm; // Update maxWpm if a larger wpm is found.
      }
    }
  
    return maxWpm;
  }
  
//   // Example usage:
//   const data = [
//     {
//       accuracy: "100.00",
//       cpm: 358,
//       date: 1697366363386,
//       id: "a5JqDr27hHAHSebmM4d1",
//       mistakes: 0,
//       time: 30,
//       userEmail: "ranariyarana20@gmail.com",
//       wpm: 30,
//     },
//     {
//       accuracy: "100.00",
//       cpm: 358,
//       date: 1697366363386,
//       id: "a5JqDr27hHAHSebmM4d1",
//       mistakes: 0,
//       time: 30,
//       userEmail: "ranariyarana20@gmail.com",
//       wpm: 70,
//     },
//     {
//       accuracy: "100.00",
//       cpm: 358,
//       date: 1697366363386,
//       id: "a5JqDr27hHssssaaAHSebmM4d1",
//       mistakes: 0,
//       time: 30,
//       userEmail: "ranariyarana20@gmail.com",
//       wpm: 170,
//     },
//     {
//       accuracy: "100.00",
//       cpm: 358,
//       date: 1697366363386,
//       id: "ghsgalfkalfalf",
//       mistakes: 0,
//       time: 30,
//       userEmail: "ranariyarana20@gmail.com",
//       wpm: 730,
//     },
//     {
//       accuracy: "100.00",
//       cpm: 358,
//       date: 1697366363386,
//       id: "a5JqDr27fswwhHAHSebmM4d1",
//       mistakes: 0,
//       time: 30,
//       userEmail: "ranariyarana20@gmail.com",
//       wpm: 750,
//     },
    
//   ];
  
//   const maxWpm = findMaxWpm(data);
//   console.log("Max WPM:", maxWpm); // Output: Max WPM: 70
  