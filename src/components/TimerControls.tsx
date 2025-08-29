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

    const handleSaveInput = () => {
        if (!inputWorkTime || isNaN(inputWorkTime)) {
            setWorkTime(DEFAULT_WORK_MINUTES * 60)
        } else {
            setWorkTime(inputWorkTime * 60)
        }

        if (!inputBreakTime || isNaN(inputBreakTime)) {
            setBreakTime(DEFAULT_BREAK_MINUTES * 60)
        } else {
            setBreakTime(inputBreakTime * 60)
        }

        if (!inputGoal || isNaN(inputGoal)) {
            setGoal(DEFAULT_GOAL)
        } else {
            setGoal(inputGoal)
        }
    }

    const workDuration = () => {
        const totalMinutes = (inputWorkTime * inputGoal) + (inputBreakTime * (inputGoal - 1))
        const totalHours = Math.floor(totalMinutes / 60)
        const totalMins = Math.round(totalMinutes % 60)

        if (totalHours > 0) {
            return `Your Pomodoro session will last ${totalHours} hours and ${totalMins} minutes!`
        }

        return `Your Pomodoro session will last ${totalMins} minutes!`
    }

    return (
        <div>
            <div>
                Work Duartion: 
                <input
                    type="text"
                    value={inputWorkTime}
                    onChange={(evt) => setInputWorkTime(Number(evt.target.value))}
                />
            </div>
            <div>
                Break Duration:
                <input
                    type="text"
                    value={inputBreakTime}
                    onChange={(evt) => setInputBreakTime(Number(evt.target.value))}
                />
            </div>
            <div>
                Number of Pomodoro Sessions:
                <input
                    type="text"
                    value={inputGoal}
                    onChange={(evt) => setInputGoal(Number(evt.target.value))}
                />
            </div>
            <p>
                {workDuration()}
            </p>
            <button onClick={handleSaveInput}>
                Save Changes
            </button>
        </div>
    )
}