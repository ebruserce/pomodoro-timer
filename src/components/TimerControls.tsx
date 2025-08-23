import { useState } from "react"
import { DEFAULT_BREAK_MINUTES, DEFAULT_GOAL, DEFAULT_WORK_MINUTES } from "../constants"

type TimerControlsProps = {
    setWorkTime: (time: number) => void
    setBreakTime: (time: number) => void
    setGoal: (goal: number) => void
}

export default function TimerControls({ setWorkTime, setBreakTime, setGoal }: TimerControlsProps) {
    const [inputWorkTime, setInputWorkTime] = useState(DEFAULT_WORK_MINUTES)
    const [inputBreakTime, setInputBreakTime] = useState(DEFAULT_BREAK_MINUTES) 
    const [inputGoal, setInputGoal] = useState(DEFAULT_GOAL)

    const handleChangeWorkTime = () => {
        if (!inputWorkTime || isNaN(inputWorkTime)) {
            setWorkTime(DEFAULT_WORK_MINUTES * 60)
        } else {
            setWorkTime(inputWorkTime * 60)
        }
    }

    const handleChangeBreakTime = () => {
        if (!inputBreakTime || isNaN(inputBreakTime)) {
            setBreakTime(DEFAULT_BREAK_MINUTES * 60)
        } else {
            setBreakTime(inputBreakTime * 60)
        }
    }

    const handleChangeGoal = () => {
        if (!inputGoal || isNaN(inputGoal)) {
            setGoal(DEFAULT_GOAL)
        } else {
            setGoal(inputGoal)
        }
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={inputWorkTime}
                    onChange={(evt) => setInputWorkTime(Number(evt.target.value))}
                />
                <button onClick={handleChangeWorkTime}>
                    Set Work Time
                </button>
            </div>
            <div>
                <input 
                    type="text" 
                    value={inputBreakTime}
                    onChange={(evt) => setInputBreakTime(Number(evt.target.value))}
                />
                <button onClick={handleChangeBreakTime}>
                    Set Break Time
                </button>
            </div>
            <div>
                <input 
                    type="text" 
                    value={inputGoal}
                    onChange={(evt) => setInputGoal(Number(evt.target.value))}
                />
                <button onClick={handleChangeGoal}>
                    Set Goal Pomodoros
                </button>
            </div>
        </div>
    )
}