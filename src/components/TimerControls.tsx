import { useState } from "react"

type TimerControlsProps = {
    setWorkTime: (time: number) => void
    setBreakTime: (time: number) => void
}

export default function TimerControls({ setWorkTime, setBreakTime }: TimerControlsProps) {
    const [inputWorkTime, setInputWorkTime] = useState("25")
    const [inputBreakTime, setInputBreakTime] = useState("5") 

    const handleChangeWorkTime = () => {
        if (!inputWorkTime) {
            setWorkTime(25 * 60)
        } else {
            setWorkTime(Number(inputWorkTime) * 60)
        }
    }

    const handleChangeBreakTime = () => {
        if (!inputBreakTime) {
            setBreakTime(25 * 60)
        } else {
            setBreakTime(Number(inputBreakTime) * 60)
        }
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={inputWorkTime}
                    onChange={(evt) => setInputWorkTime(evt.target.value)}
                />
                <button onClick={handleChangeWorkTime}>
                    Set Work Time
                </button>
            </div>
            <div>
                <input 
                    type="text" 
                    value={inputBreakTime}
                    onChange={(evt) => setInputBreakTime(evt.target.value)}
                />
                <button onClick={handleChangeBreakTime}>
                    Set Break Time
                </button>
            </div>
        </div>
    )
}