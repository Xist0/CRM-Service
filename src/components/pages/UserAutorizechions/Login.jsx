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
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });
            const { accessToken, username: loggedInUserName } = response.data;
            setAccessToken(accessToken);
            setIsLoggedIn(true);
            localStorage.setItem('accessToken', accessToken);
            setStaffName(loggedInUserName);

            // Переадресация на страницу /app
            window.location.href = '/app';
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = () => {
        setAccessToken('');
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
    };

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
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Login;
