import _TodoistButton from "../assets/Todoist_Button.svg";
import _SettingsButton from "../assets/Settings_Button.svg";

type HeaderBarProps = {
    onSettingsClick: () => void
}

export default function HeaderBar({ onSettingsClick }: HeaderBarProps) {
    const handleTodoistClick = () => {
        window.location.href = 'http://localhost:4000/auth/login'; // Redirect to the backend server for OAuth
    }

    return (
        <div className="w-full p-4 flex items-center justify-center relative border-b-4 border-sage-200">
            <div className="text-sage-100 text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-staatliches">
                POMOGROWO
            </div>
            <div className="absolute right-4 flex gap-2 justify-center items-center">
                <button onClick={handleTodoistClick}>
                    <img 
                        src={_TodoistButton} 
                        alt="Todoist Button" 
                        className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22"/>  
                </button>
                <button onClick={onSettingsClick}>
                    <img 
                        src={_SettingsButton} 
                        alt="Settings Button" 
                        className="mb-1 w-13 h-13 sm:w-17 sm:h-17 md:w-21 md:h-21 lg:w-25 lg:h-25"/>
                </button>
            </div>
        </div>
    )
}