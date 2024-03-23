import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Header';
import { logOut } from '../redux/authSlice'

function PersonalAccount() {
    const [greeting, setGreeting] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.role)

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
    return (
        <div>
            <Header />
            <div className="container-box">
                <div className="Personal-container">
                    <h1>{greeting}, {staffName}!</h1>
                    <p>Роль: {staffRole} </p>
                    msrifluherui
                    <button onClick={() => {
                        dispatch(logOut())
                    }}>log out</button>
                    <div className="personal-container-orders">
                        <h1>Список активных заказов</h1>
                        <div className="personal-container-orders-main">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PersonalAccount;
