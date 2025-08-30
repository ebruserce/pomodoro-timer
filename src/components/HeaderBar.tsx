import _TodoistButton from "../assets/Todoist_Button.svg";
import _SettingsButton from "../assets/Settings_Button.svg";

type HeaderBarProps = {
    onSettingsClick: () => void
}

export default function HeaderBar({ onSettingsClick }: HeaderBarProps) {
    return (
        <div className="w-full p-4 flex items-center justify-center relative border-b-4 border-sage-200">
            <div className="text-sage-100 text-center text-8xl font-staatliches">
                POMOGROWO
            </div>
            <div className="absolute right-4 flex gap-4">
                <button>
                    <img 
                        src={_TodoistButton} 
                        alt="Todoist Button" 
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"/>  
                </button>
                <button onClick={onSettingsClick}>
                    <img 
                        src={_SettingsButton} 
                        alt="Settings Button" 
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"/>
                </button>
            </div>
        </div>
    )
}