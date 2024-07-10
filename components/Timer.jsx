import { Text, } from 'react-native';
import { useState, useEffect } from 'react';

function formatTime(time) {
  if(time > 3600) {
    throw new Error("Don't play this game for more than an hour!");
  }
  const minutes = String(Math.floor(time/60));
  const seconds = String(time % 60);
  return `Time: ${minutes.padStart(2,"0")}:${seconds.padStart(2,"0")}`;
}

export default function Timer({ totalGameTime, setIsGameOver, textStyle }) {
  const [timeLeft, setTimeLeft] = useState(totalGameTime);
  useEffect(() => {
    if(timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft((currentTimeLeft) => currentTimeLeft - 1);
      }, 1000);
    } else {
      setIsGameOver(true);
    }
  }, [timeLeft]);
  return <Text style={textStyle}>{formatTime(timeLeft)}</Text>;
}
