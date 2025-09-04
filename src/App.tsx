import { useState } from 'react'
import './App.css'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import ProgressIndicator from './components/ProgressIndicator'
import CompletionPage from './components/CompletionPage'
import HeaderBar from './components/HeaderBar'
import { DEFAULT_BREAK_MINUTES, DEFAULT_GOAL, DEFAULT_WORK_MINUTES } from './constants'
import PlantGrowth from './components/PlantGrowth'
import TodoistTasks from './components/TodoistTasks'

type Mode = "work" | "break"

function App() {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_MINUTES * 60)
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_MINUTES * 60)
  const [showControls, setShowControls] = useState(false)

  const [completed, setCompleted] = useState(0)
  const [goal, setGoal] = useState(DEFAULT_GOAL)

  const [mode, setMode] = useState<Mode>("work")

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
    <div className='bg-sage-300 min-h-screen flex flex-col gap-8'>
      {/* Header Bar */}
      <div>
          <HeaderBar onSettingsClick={toggleControls}></HeaderBar>
      </div>
      <div className="flex justify-center relative">
            {showControls && (
              <div className="absolute right-8 w-1/5 max-w-xl">
                <TimerControls setWorkTime={setWorkTime} setBreakTime={setBreakTime} setGoal={setGoal}></TimerControls>
              </div>
            )}
          <div className='bg-sage-200 rounded-4xl w-2/5 max-w-2xl aspect-[4/3] flex items-center justify-center shadow-md'>
            <div className='bg-sage-100 rounded-4xl w-4/5 max-w-xl aspect-[4/3] flex flex-col items-center justify-center shadow-md'>
              <ProgressIndicator completed={completed} goal={goal} />
              <TimerDisplay mode={mode} setMode={setMode} workTime={workTime} breakTime={breakTime} onComplete={handlePomodoroComplete} />
            </div>
          </div>
      </div>
      <PlantGrowth></PlantGrowth>
      <div className='w-2/5 max-w-4xl mx-auto'>
        <TodoistTasks></TodoistTasks>
      </div>
    </div>
  )
}

export default App
