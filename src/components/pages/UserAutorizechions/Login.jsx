import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');

    const serverAddress = 'https://localhost:3000'; // Исправлен адрес сервера

    const authorize = async () => {
        try {
            const response = await axios.post(
                `${serverAddress}/authorize`,
                { authorizationLogin: userLogin, authorizationPassword: userPassword },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Исправлено response.data
                window.location.href = '/app';
            } else {
                setError('Undefined'); // Исправлено значение ошибки
            }
        } catch (error) {
            setError('Error'); // Обработка ошибки
        }
    };

    return (
        <div>
            <div className="container-login">
                <div className="container-login-title">
                    <h1>Авторизация</h1>
                </div>
                <div className="container-login-main">
                    <input type="text" value={userLogin} onChange={(e) => setUserLogin(e.target.value)} placeholder="Логин" />
                    <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="Пароль" />
                </div>
                <div className="container-login-footer">
                    <button onClick={authorize}>Войти</button>
                </div>
                {error && <p>Не верный логин или пароль</p>}
            </div>
        </div>
    );
}

export default Login;
