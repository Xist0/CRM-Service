import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';

function PersonalAccount() {
    const [greeting, setGreeting] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffRole, setStaffRole] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                setStaffName(userData.staff_name);
                setStaffRole(userData.staff_role);
            }
        }
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
    }, []);
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="Personal-container">
                <h1>{greeting}, {staffName}!</h1>
                <p>Роль: {staffRole} </p>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
}

export default PersonalAccount;
