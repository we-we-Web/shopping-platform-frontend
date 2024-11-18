import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';

interface SetLoginOpenProps {
    onOpen: () => void;
}
function LoginButton({ onOpen }: SetLoginOpenProps) {
    return (
        <div className="absolute top-6 right-8">
            <button
                onClick={() => onOpen()}
                className="flex items-center p-1.5 rounded-full hover:opacity-70"
                style={{ border: '2px solid black' }}
            >
                <FontAwesomeIcon icon={faUserRegular} className="text-2xl" />
            </button>
        </div>
    )
}

export default LoginButton;