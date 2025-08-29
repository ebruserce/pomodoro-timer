import Seed from '../assets/Seed.png'
import Tomato from '../assets/Tomato.png'
import Green_Tomato from '../assets/Green_Tomato.svg'
import Red_Tomato from '../assets/Red_Tomato.svg'

type PomodoroProgressProps = {
    completed: number
    goal: number
}

export default function ProgressIndicator({ completed, goal }: PomodoroProgressProps) {
    return (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "4px" }}>
        {Array.from({ length: goal }).map((_, index) => {
            const isCompleted = index < completed
            return (
            <img
                key={index}
                src={isCompleted ? Red_Tomato : Green_Tomato}
                alt={isCompleted ? "Red_Tomato" : "Green_Tomato"}
                style={{ width: "36px", height: "48px" }}
            />
            )
        })}
        </div>
    )
}