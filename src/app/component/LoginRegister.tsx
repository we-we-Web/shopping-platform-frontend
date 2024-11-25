import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LoginRegister({ onClose }: {onClose: () => void}) {
    const [authUrl, setAuthUrl] = useState<string | null>(null);

    useEffect(() => {
        axios.get('https://dongyi-api.hnd1.zeabur.app/user/auth/login', {
            withCredentials:true
        })
            .then((res) => setAuthUrl(res.data.auth_url))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            {authUrl ? (
                <a href={authUrl} onClick={onClose}>
                    <button style={{ border: '1px solid' }}>Login with Google</button>
                </a>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}