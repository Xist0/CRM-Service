import React from 'react';
import Header from '../Header';

function PersonalAccount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { staff_name, staff_role } = user;

    function handleLogout() {
        // Полная очистка токена и данных пользователя
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    function getGreeting() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour >= 6 && currentHour < 12) {
            return "Доброе утро";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Добрый день";
        } else if (currentHour >= 18 && currentHour < 22) {
            return "Добрый вечер";
        } else {
            return "Доброй ночи";
        }
    }

    const greeting = getGreeting();
    const finalGreeting = `${greeting}, ${staff_name}!`;

    return (
        <div>
            <Header />
            <div className="Personal-container">
                <h1>{finalGreeting}</h1>
                <p>Роль: {staff_role}</p>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
}

export default PersonalAccount;
