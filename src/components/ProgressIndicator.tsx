import _Seed from '../assets/Seed.png'
import _Tomato from '../assets/Tomato.png'
import Green_Tomato from '../assets/Green_Tomato.svg'
import Red_Tomato from '../assets/Red_Tomato.svg'

type PomodoroProgressProps = {
    completed: number
    goal: number
}

export default function ProgressIndicator({ completed, goal }: PomodoroProgressProps) {
    return (
        <div className='flex justify-center mb-2'>
        {Array.from({ length: goal }).map((_, index) => {
            const isCompleted = index < completed
            return (
            <img className='w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12'
                key={index}
                src={isCompleted ? Red_Tomato : Green_Tomato}
                alt={isCompleted ? "Red_Tomato" : "Green_Tomato"}
            />
            )
        })}
        </div>
    )
}