import { useState } from 'react'
import './App.css'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import ProgressIndicator from './components/ProgressIndicator'

function App() {
  const [workTime, setWorkTime] = useState(25 * 60)
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [goalPomodoros, setGoalPomodoros] = useState(4)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  return (
    <>
      <ProgressIndicator completed={completedPomodoros} goal={goalPomodoros}></ProgressIndicator>
      <TimerDisplay workTime={workTime} breakTime={breakTime}></TimerDisplay>
      <TimerControls setWorkTime={setWorkTime} setBreakTime={setBreakTime}></TimerControls>
    </>
  )
}

export default App
