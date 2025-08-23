import { useState } from 'react'
import './App.css'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import ProgressIndicator from './components/ProgressIndicator'
import SettingsIcon from './assets/Pomodoro_Setting_Icon.svg'
import CompletionPage from './components/CompletionPage'
import { DEFAULT_BREAK_MINUTES, DEFAULT_GOAL, DEFAULT_WORK_MINUTES } from './constants'

function App() {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_MINUTES * 60)
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_MINUTES * 60)
  const [showControls, setShowControls] = useState(false)

  const [completed, setCompleted] = useState(0)
  const [goal, setGoal] = useState(DEFAULT_GOAL) // TODO: implement user goal input

  const toggleControls = () => {
    setShowControls((prev) => !prev)
  }

  const handlePomodoroComplete = () => {
    setCompleted(prev => Math.min(prev + 1, goal))
  }

  const handleReset = () => {
    setCompleted(0)
  }

  return (
    <>
      {goal === completed ? (
        <CompletionPage onReset={handleReset} />
      ) : (
        <>
          {/* Settings toggle button */}
          <button onClick={toggleControls} style={{ background: "none", border: "none", cursor: "pointer "}}>
            <img
              src={SettingsIcon}
              alt="Settings"
              style={{ width: "128px", height: "128px"}}
            />
          </button>
          {showControls && <TimerControls setWorkTime={setWorkTime} setBreakTime={setBreakTime} setGoal={setGoal}></TimerControls>}
          <ProgressIndicator completed={completed} goal={goal} />
          <TimerDisplay workTime={workTime} breakTime={breakTime} onComplete={handlePomodoroComplete} />
        </>
      )}
    </>
  )
}

export default App
