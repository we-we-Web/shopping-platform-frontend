import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {

        await fetch('https://dongyi-api.hnd1.zeabur.app/user/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.removeItem('access-token');
        router.push('/');
    };

    return (
        <button onClick={handleLogout} style={{ border: '1px solid black' }}>
            登出
        </button>
    );
};

export default LogoutButton;