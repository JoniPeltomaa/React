import React, { useEffect, useState } from 'react';
import './App.css';


// is stopwatch running
const [isOn, setIsOn] = useState(false);
// stopwatch timer
const [timer, setTimer] = useState(0);

useEffect(() => {
  // just a testing
  console.log('effect runs');
  // change timer value in every second
  let interval;
  if (isOn) {
    interval = setInterval(() => setTimer(timer => timer + 1),1000);
  }    
  // clean up
  return () => clearInterval(interval);
}, [isOn, timer]); 

const reset = () => {
  setIsOn(false);
  setTimer(0);
};

// only render if isOn or timer is different than prev state

function App() {
  return (
    <div>
  <p>
    {timer}
  </p>
  {!isOn && (
    <button type="button" onClick={() => setIsOn(true)}>Start</button>
  )}
  {isOn && (
    <button type="button" onClick={() => setIsOn(false)}>Stop</button>
  )}
  <button type="button" disabled={timer === 0}>
    Reset
  </button>
</div>
  );
}

export default App;
