export default function formatSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h:${minutes}min`;
  }
  
//   // Example usage:
//   const seconds = 334325;
//   const formattedTime = formatSecondsToHoursAndMinutes(seconds);
//   console.log(formattedTime); // Output: "93h:5min"
  