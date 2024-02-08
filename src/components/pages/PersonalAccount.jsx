import React, { useState, useEffect } from 'react';
import Header from '../Header';

function PersonalAccount() {
    const [userData, setUserData] = useState(null);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
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

    return (
        <div>
            <Header />
            <div className="Personal-container">
                <h1>{`${greeting}, ${userData.staff_name}!`}</h1>
                <p>Роль: {userData.staff_role}</p>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
}

export default PersonalAccount;
