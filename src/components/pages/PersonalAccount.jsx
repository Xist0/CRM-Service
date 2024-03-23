import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';
import { logOut } from '../redux/authSlice';
import { jwtDecode } from "jwt-decode";

function PersonalAccount() {
    const [greeting, setGreeting] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.name); // Получаем имя пользователя из состояния Redux

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setStaffRole(decodedToken.role);
        }

        // Генерируем приветствие в зависимости от времени суток
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        let greetingText = '';
        if (currentHour >= 6 && currentHour < 12) {
            greetingText = "Доброе утро";
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingText = "Добрый день";
        } else if (currentHour >= 18 && currentHour < 22) {
            greetingText = "Добрый вечер";
        } else {
            greetingText = "Доброй ночи";
        }
        setGreeting(greetingText);
    }, [token]);

    return (
        <div>
            <Header />
            <div className="container-box">
                <div className="Personal-container">
                    <h1>{greeting}, {username}!</h1>
                    <p>Роль: {staffRole}</p>
                    <button onClick={() => dispatch(logOut())}>Выйти</button>
                    <div className="personal-container-orders">
                        <h1>Список активных заказов</h1>
                        <div className="personal-container-orders-main">
                            {/* Вывод списка заказов */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalAccount;
