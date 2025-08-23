import Seed from '../assets/Seed1.svg'
import Tomato from '../assets/Pom1.svg'

type PomodoroProgressProps = {
    completed: number
    goal: number
}

export default function ProgressIndicator({ completed, goal }: PomodoroProgressProps) {
    return (
        <div style={{ display: "flex", gap: "2px", justifyContent: "center", marginBottom: "4px" }}>
        {Array.from({ length: goal }).map((_, index) => {
            const isCompleted = index < completed
            return (
            <img
                key={index}
                src={isCompleted ? Tomato : Seed}
                alt={isCompleted ? "Tomato" : "Seed"}
                style={{ width: "64px", height: "64px" }}
            />
            )
        })}
        </div>
    )
}