import { useState } from 'react'
import './App.css'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'

function App() {
  const [time, setTime] = useState(25 * 60)

  return (
    <>
      <TimerControls setTime={setTime}></TimerControls>
      <TimerDisplay time={time}></TimerDisplay>
    </>
  )
}

export default App
