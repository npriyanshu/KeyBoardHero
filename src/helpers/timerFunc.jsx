export default function countdownTimer(initialTimeInSeconds, onTick, onFinish) {
    let currentTime = initialTimeInSeconds;
  
    const timerInterval = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        if (onTick) {
          onTick(currentTime);
        }
      } else {
        clearInterval(timerInterval);
        if (onFinish) {
          onFinish();
        }
      }
    }, 1000);

    return timerInterval
  }
  