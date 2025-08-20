import { useState } from 'react'
import './App.css'
import TimerDisplay from './components/TimerDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TimerDisplay></TimerDisplay>
    </>
  )
}

export default App
