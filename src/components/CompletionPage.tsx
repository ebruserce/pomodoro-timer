type CompletionPageProps = {
    onReset: () => void
}

export default function CompletionPage({ onReset }: CompletionPageProps) {

    return (
        <div>
            <h1>
                Great Job! You've Completed Your Pomodoro Session!
            </h1>
            <button onClick={onReset}>
                Work More?
            </button>
        </div>
    )
}