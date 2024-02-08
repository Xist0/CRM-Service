import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staffName, setStaffName] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setAccessToken(storedToken);
            setIsLoggedIn(true);
            // Если пользователь уже вошел в систему, загрузите его данные из localStorage
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                setStaffName(userData.staff_name);
            }
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });
            const { accessToken, username: staff_name, staff_role } = response.data;
            setAccessToken(accessToken);
            setIsLoggedIn(true);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ staff_name, staff_role }));
            window.location.href = '/app';
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setAccessToken('');
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    

    const handleLog = () => {
        window.location.href = '/app';
    }

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <p>Welcome, {staffName}!</p>
                    <button onClick={handleLogout}>Выйти</button>
                    <button onClick={handleLog}>Перейти на сайт</button>
                </div>
            )}
        </div>
    );
};

export default Login;
