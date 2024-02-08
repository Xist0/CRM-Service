import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { FaRegCircleQuestion } from "react-icons/fa6";

function Login() {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const [showQuestion, setShowQuestion] = useState(false);

    const isBrowser = typeof window !== 'undefined';
    const serverAddress = isBrowser ? 'https://192.168.102.35:3000' : 'https://localhost:5173/';

    const authorize = async () => {
        try {
            const response = await axios.post(
                `${serverAddress}/authorize`,
                { authorizationLogin: userLogin, authorizationPassword: userPassword },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status === 200) {
                localStorage.setItem('userRole', response.data.staff_role);
                localStorage.setItem('userId', response.data.id_staff);
                window.location.href = '/app';
            } else {
                setError('Неверные учетные данные');
            }
        } catch (error) {
            setError('Ошибка авторизации');
        }
    };

    const toggleQuestion = () => {
        setShowQuestion(!showQuestion); 
    };

    return (
        <div>
            <div className="container-login">
                <div className="container-login-title">
                    <h1>Авторизация</h1>
                </div>
                <div className="container-login-main">
                    <div className="container-login-main-qweru">
                        <input type="number" pattern="\d*" value={userLogin} onChange={(e) => setUserLogin(e.target.value)} placeholder="Номер телефона +7" />
                        <FaRegCircleQuestion onClick={toggleQuestion} />
                    </div>
                    {showQuestion && (
                        <div className="additional-block">
                            Можно использовать сокращённый номер, например: 101
                        </div>
                    )}
                    <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="Пароль" />
                </div>
                <div className="container-login-footer">
                    <button onClick={authorize}>Войти</button>
                </div>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Login;
