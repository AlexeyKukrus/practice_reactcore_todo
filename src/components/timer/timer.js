import React, { useState } from 'react';

const Timer = ({ initialTime, timer }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning && time > 0) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(timer);
          setIsRunning(false);
        }
      }, 1000);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(timer);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <button type="button" className="icon icon-play" onClick={startTimer} disabled={isRunning} aria-label="play" />
      <button type="button" className="icon icon-pause" onClick={pauseTimer} disabled={!isRunning} aria-label="pause" />
      {` ${minutes}:${seconds}`}
    </>
  );
};

export default Timer;
