﻿import React, { useEffect, useState } from 'react';
import LogoutButton from '../app/component/LogoutButton';
import { jwtDecode } from 'jwt-decode';
import { UserProfile } from '../app/model/userProfile';

const User: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            try {
                const decoded: UserProfile = jwtDecode(token);
                setEmail(decoded.email);
            } catch (error) {
                console.error("無效的 JWT:", error);
            }
        }
    }, []);

    return (
        <div>
            <p>{email}</p>
            <LogoutButton />
        </div>
    );
};

export default User;