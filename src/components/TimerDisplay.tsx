import { useState, useEffect } from "react";
import Skip from "../assets/Skip_Button.svg"
import Reset from "../assets/Restart_Button.svg"

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

    const handleSkip = () => {
        setIsRunning(false)
        if (mode === "work") {
            onComplete()
        }
        switchSessions()
    }

    const switchSessions = () => {
        setIsRunning(false)
        if (mode === "work") {
            setMode("break")
            setTimeLeft(breakTime)
        } else {
            setMode("work")
            setTimeLeft(workTime)
        }
        
    }


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    return (
        <div>
            <h1 className="font-staatliches text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white flex justify-center">
                {formatTime(timeLeft)}
            </h1>
            <div className="flex justify-center gap-3 mt-2">
                {isRunning && <button onClick={handleReset}><img className="h-7 sm:h-9 md:h-11 lg:h-13" src={Reset}/></button>}
                <button className="bg-green-fill rounded-[43px] w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10 lg:w-20 lg:h-12 shadow-md" 
                    onClick={handleStartPause}>
                    {isRunning ? (
                        <h1 className="text-white font-sofia text-sm sm:text-md md:text-xl lg:text-xl xl:text-2xl">
                            Pause
                        </h1>  
                    ): (
                        <h1 className="text-white font-sofia text-sm sm:text-md md:text-xl lg:text-xl xl:text-2xl">
                            Start
                        </h1> 
                    )}
                </button>
                {isRunning && <button onClick={handleSkip}><img className="h-7 sm:h-9 md:h-11 lg:h-13" src={Skip}/></button>}
            </div>
        </div>
    )
}