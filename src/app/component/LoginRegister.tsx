import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LoginRegister({ onClose }: {onClose: () => void}) {
    const [authUrl, setAuthUrl] = useState<string | null>(null);

    useEffect(() => {
        axios.get('https://dongyi-user.hnd1.zeabur.app/login', {
            withCredentials:true
        })
            .then((res) => setAuthUrl(res.data.auth_url))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            {authUrl ? (
                <a href={authUrl} onClick={onClose}>
                    <button>Login with Google</button>
                </a>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}