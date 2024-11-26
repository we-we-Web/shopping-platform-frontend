import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
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