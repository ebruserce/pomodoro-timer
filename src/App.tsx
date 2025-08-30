import { useState } from 'react'
import './App.css'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import ProgressIndicator from './components/ProgressIndicator'
import SettingsIcon from './assets/Pomodoro_Setting_Icon.png'
import CompletionPage from './components/CompletionPage'
import HeaderBar from './components/HeaderBar'
import { DEFAULT_BREAK_MINUTES, DEFAULT_GOAL, DEFAULT_WORK_MINUTES } from './constants'
import PlantGrowth from './components/PlantGrowth'

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

  if (goal === completed) {
    return <CompletionPage onReset={handleReset} />
  }

  return (
    <div className='bg-sage-300 min-h-screen flex justify-center items-start pt-30'>
      <HeaderBar></HeaderBar>
      {/* Settings toggle button */}
      <div className='absolute top-4 left-4'>
        <button 
          onClick={toggleControls} 
          style={{ background: "none", border: "none", cursor: "pointer "}}
        >
          <img
            src={SettingsIcon}
            alt="Settings"
            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'
          />
        </button>
        {showControls && <TimerControls setWorkTime={setWorkTime} setBreakTime={setBreakTime} setGoal={setGoal}></TimerControls>}
      </div>
      <div className='bg-sage-200 rounded-[40px] w-[80%] max-w-[657px] aspect-[657/486] flex items-center justify-center shadow-md'>
        <div className='bg-sage-100 rounded-[40px] w-[80%] max-w-[569px] aspect-[569/425] flex flex-col items-center justify-center shadow-md'>
          <ProgressIndicator completed={completed} goal={goal} />
          <TimerDisplay workTime={workTime} breakTime={breakTime} onComplete={handlePomodoroComplete} />
        </div>
      </div>
      <PlantGrowth></PlantGrowth>
    </div>
  )
}

export default App
