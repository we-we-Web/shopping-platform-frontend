import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginPopup from './LoginPopup';
import { UserProfile } from '../model/userProfile';

function LoginButton() {
    const router = useRouter();
    const { id_token } = router.query;
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (!id_token) {
            console.warn("id_token 尚未載入");
            return;
        }
        try {
            const decoded: UserProfile = jwtDecode(`${id_token}`);
            setProfile(decoded);
        } catch (error) {
            console.error("無效的 JWT:", error);
        }
    }, [id_token]);

    useEffect(() => {
        document.body.style.overflow = isLoginOpen ? 'hidden' : 'auto';
    }, [isLoginOpen]);

    return (
        <div className="absolute top-6 right-8">
            <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center rounded-full hover:opacity-70"
                style={{ border: '2px solid black' }}
            >
                { profile ? <img src={profile.picture} alt="Profile Picture" className="w-9 rounded-full" /> :
                    <FontAwesomeIcon icon={faUserRegular} className="text-2xl m-1.5" />
                }
            </button>

            {isLoginOpen &&
                <LoginPopup
                    onClose={() => setLoginOpen(false)} 
                />
            }
        </div>
    )
}

export default LoginButton;