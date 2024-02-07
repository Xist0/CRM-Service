import React from 'react';
import Header from '../Header';

function PersonalAccount() {
  const user = JSON.parse(localStorage.getItem('user'));
  
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

    const fullName = "Иван Иванов";
    const greeting = getGreeting();
    const finalGreeting = `${greeting}, ${fullName}!`;

    return (
        <div>
            <Header />
            <div className="Personal-container">
                <h1>{finalGreeting}</h1>
            </div>
        </div>
    );
}

export default PersonalAccount;
