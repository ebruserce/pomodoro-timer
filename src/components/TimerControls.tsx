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
            return `Total: ${totalHours} hours and ${totalMins} minutes!`
        }

        return `Total: ${totalMins} minutes!`
    }

    return (
        <div className="bg-sage-200 rounded-4xl flex flex-col shadow-md relative">
            <div className="text-white font-sofia text-xl md:text-2xl lg:text-2xl p-4 flex justify-center">
                Timer Settings
            </div>
            <div className="flex justify-between items-center p-4">
                <p className="text-white font-sofia text-md md:text-xl lg:text-xl pr-4">
                    Work Duartion: 
                </p>
                <input
                    type="number"
                    value={inputWorkTime}
                    onChange={(evt) => setInputWorkTime(Number(evt.target.value))}
                    className="bg-sage-100 rounded-4xl flex items-center justify-center font-sofia text-md md:text-xl lg:text-xl w-28 text-center text-green-fill"
                />
            </div>
            <div className="flex justify-between items-center p-4">
                <p className="text-white font-sofia text-md md:text-xl lg:text-xl pr-4">
                    Break Duartion: 
                </p>
                <input
                    type="number"
                    value={inputBreakTime}
                    onChange={(evt) => setInputBreakTime(Number(evt.target.value))}
                    className="bg-sage-100 rounded-4xl flex items-center justify-center font-sofia text-md md:text-xl lg:text-xl w-28 text-center text-green-fill"
                />
            </div>
            <div className="flex justify-between items-center p-4">
                <p className="text-white font-sofia text-md md:text-xl lg:text-xl pr-4">
                    Goal Num. Of Pomodoros: 
                </p>
                <input
                    type="number"
                    value={inputGoal}
                    onChange={(evt) => setInputGoal(Number(evt.target.value))}
                    className="bg-sage-100 rounded-4xl flex items-center justify-center font-sofia text-md md:text-xl lg:text-xl w-28 text-center text-green-fill"
                />
            </div>
            <p className="text-white font-sofia text-md md:text-l lg:text-l p-4 flex justify-center">
                {workDuration()}
            </p>
            <div className="flex justify-center p-4">
                <button onClick={handleSaveInput} className="bg-green-fill rounded-[43px] w-16 h-8 md:w-20 md:h-12 lg:w-20 lg:h-12 shadow-md flex justify-center items-center text-white font-sofia text-md md:text-l lg:text-l">
                    Save
                </button>
            </div>
        </div>
    )
}