import { useState, useEffect } from "react";

type TimeDisplayProps = {
    time: number
}

export default function TimerDisplay({ time }: TimeDisplayProps) {
    const [timeLeft, setTimeLeft] = useState(time) // 25 minutes * 60 seconds = 1500 seconds
    const [isRunning, setIsRunning] = useState(false) // state to check whether the timer is running

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
        }
        // cleanup function ensures that only one interval runs at once (otherwise, the timer would tick down too fast)
        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    useEffect(() => {
        setIsRunning(false)
        setTimeLeft(time)
    }, [time])

    const handleStartPause = () => {
        setIsRunning((prev) => !prev);
    }

    const handleReset = () => {
        setIsRunning(false)
        setTimeLeft(25 * 60)
    }

    return (
        <div>
            <h3>
                Pomodoro Timer
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
        </div>
    )
}