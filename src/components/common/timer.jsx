import React, { useState, useEffect } from 'react';
import './Playerbid.css';

function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    // Start the timer when isActive is true
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds(totalSeconds => totalSeconds + 1);
      }, 1000);
    } else {
      // Clear the interval when isActive is false
      clearInterval(interval);
    }

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [isActive]); // Run this effect whenever isActive changes

  // Function to handle start, pause, and reset
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTotalSeconds(0);
    setIsActive(false);
  };

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '9') {
        toggleTimer(); // Start or pause the timer when '9' is pressed
      } else if (event.key === '8') {
        toggleTimer(); // Pause the timer when 'Enter' is pressed
      } else if (event.key === '0') {
        resetTimer(); // Reset the timer when '0' is pressed
      }
    };

    // Add event listener for keydown event
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // This effect runs only once on component mount

  return (
    <div className="timer-box">
      <div className="timer-content">
        <div className="buttons">
          {!isActive ? (
            <button className='mx-3 btn text-light  border rounded-2' style={{background: '  #010203'}} onClick={toggleTimer}>Start</button>
          ) : (
            <button className='mx-3 btn text-light  border rounded-2' style={{background: '  #010203'}} onClick={toggleTimer}>Pause</button>
          )}
          <button className='mx-3 btn text-light  border rounded-2' style={{background: '  #010203'}} onClick={resetTimer}>Reset</button>
        </div>
        <h1 className='tm'>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</h1>
      </div>
    </div>
  );
}

export default Timer;
