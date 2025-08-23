import { useState, useEffect } from "react";

type TimeDisplayProps = {
    workTime: number
    breakTime: number
    onComplete: () => void
}

type Mode = "work" | "break"

export default function TimerDisplay({ workTime, breakTime, onComplete }: TimeDisplayProps) {
    const [timeLeft, setTimeLeft] = useState(workTime) // 25 minutes * 60 seconds = 1500 seconds
    const [isRunning, setIsRunning] = useState(false) // state to check whether the timer is running
    const [mode, setMode] = useState<Mode>("work")

    // useEffect hook performs "side effects"
    // it is called whenever one of its dependencies (isRunning, timeLeft) change
    useEffect(() => {
        let interval: number | undefined;
        // decrement timeLeft only if there is still time left and the timer is running
        if (isRunning && timeLeft > 0) {
            // intervals are scheduled tasks that repeat every X milliseconds until you stop it (1000ms = 1s)
            // here, we count down by one second every second
            interval = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000);
        } else if (isRunning && timeLeft === 0) {
            if (mode === "work") {
                onComplete()
            }
            // Switch modes when timer finishes
            setIsRunning(false)
            setMode((prev) => (prev === "work" ? "break" : "work"))
        }
        // cleanup function ensures that only one interval runs at once (otherwise, the timer would tick down too fast)
        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    // Sync with prop when switching modes, update timers with user input
    useEffect(() => {
        setIsRunning(false)
        setTimeLeft(mode === "work" ? workTime : breakTime)
    }, [mode, workTime, breakTime])

    const handleStartPause = () => {
        setIsRunning((prev) => !prev);
    }

    const handleReset = () => {
        setIsRunning(false)
        setTimeLeft(mode === "work" ? workTime : breakTime)
    }

    const handleSkipBreak = () => {
        setIsRunning(false)
        setMode("work")
        setTimeLeft(workTime)
    }

    return (
        <div>
            <h3>
                {mode === "work" ? "Work Time" : "Break Time"}
            </h3>
            <h1>
                {Math.floor(timeLeft / 60)
                    .toString()
                    .padStart(2, "0")}
                :
                {(timeLeft % 60).toString().padStart(2, "0")}
            </h1>
            <button onClick={handleStartPause}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={handleReset}>
                Reset
            </button>
            {mode === "break" && <button onClick={handleSkipBreak}>Skip Break?</button>}
        </div>
    )
}