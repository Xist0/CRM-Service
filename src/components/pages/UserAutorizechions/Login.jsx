import React, { useState, useEffect } from 'react';
import './login.css'
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staffName, setStaffName] = useState('');
    const [error, setError] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

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
        if (!username || !password) {
            setError('Пожалуйста, заполните все поля');
            setUsernameValid(!!username);
            setPasswordValid(!!password);
            return;
        }
        try {
            const response = await axios.post('/api/login', { username, password });
            const { accessToken, username: staff_name, staff_role } = response.data;
            setAccessToken(accessToken);
            setIsLoggedIn(true);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ staff_name, staff_role }));
            window.location.href = '/app';
        } catch (error) {
            setError('Ошибка авторизации. Пожалуйста, проверьте правильность введенных данных.');
            console.error('Ошибка авторизации:', error);
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

    const handleUsernameBlur = () => {
        setUsernameValid(!!username);
    };

    const handlePasswordBlur = () => {
        setPasswordValid(!!password);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div className='container-login'>
                    <div className="container-login-title">
                        <h1>Авторизация</h1>
                    </div>
                    <input type="text" className={!usernameValid ? 'invalid' : ''} value={username} onChange={(e) => setUsername(e.target.value)} onBlur={handleUsernameBlur} placeholder="Логин" />
                    <input type="password" className={!passwordValid ? 'invalid' : ''} value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handlePasswordBlur} placeholder="Пароль" />
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={handleLogin}>Войти</button>
                </div>
            ) : (
                <div className='container-login'>
                    <div className="container-login-title">
                        <h1>С возвращением, {staffName}!</h1>
                    </div>
                    <button onClick={handleLogout}>Выйти</button>
                    <button onClick={handleLog}>Перейти на сайт</button>
                </div>
            )}
        </div>
    );
};

export default Login;
