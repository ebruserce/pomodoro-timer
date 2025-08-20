import { useState } from "react"
import type { ChangeEvent } from "react"

type TimerControlsProps = {
    setTime: (time: number) => void
}

export default function TimerControls({ setTime }: TimerControlsProps) {
    const [inputTime, setInputTime] = useState("25")

    const handleChangeTime = () => {
        if (!inputTime) {
            setTime(25 * 60)
        } else {
            setTime(Number(inputTime) * 60)
        }
    }

    return (
        <div>
            <input 
                type="text" 
                value={inputTime}
                onChange={(evt) => setInputTime(evt.target.value)}
            />
            <button onClick={handleChangeTime}>
                Set Time
            </button>
        </div>
    )
}