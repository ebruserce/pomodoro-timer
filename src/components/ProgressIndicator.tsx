type PomodoroProgressProps = {
    completed: number
    goal: number
}

export default function ProgressIndicator({ completed, goal }: PomodoroProgressProps) {
    return (
        <div>
            <h4>
                Progress
            </h4>
            <p>
                {completed} / {goal} Pomodoros Completed
            </p>
        </div>
    )
}