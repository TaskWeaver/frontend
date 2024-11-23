import {useState, useEffect, useCallback} from 'react';
import BackgroundTimer from 'react-native-background-timer';

// TODO : CHANGE TIME TO 300;
const TIMER_DURATION = 30;

const useTimer = (initialDuration = TIMER_DURATION) => {
  const [secondsLeft, setSecondsLeft] = useState(initialDuration);

  useEffect(() => {
    const interval = BackgroundTimer.setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 1) {
          BackgroundTimer.clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  }, []);

  const resetTimer = useCallback(() => {
    setSecondsLeft(initialDuration);
  }, [initialDuration]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }, [secondsLeft]);

  return {
    secondsLeft,
    formatTime,
    resetTimer,
  };
};

export default useTimer;
