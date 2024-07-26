import {useState, useEffect, useCallback} from 'react';
import BackgroundTimer from 'react-native-background-timer';

const TIMER_DURATION = 60 * 5;

const useTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);

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
  };
};

export default useTimer;
