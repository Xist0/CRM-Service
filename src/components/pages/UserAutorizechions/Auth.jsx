import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Log = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState([]);

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        setErrorMessage(authState.error || ''); 
    }, [authState.error]);

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            setInvalidFields([username.trim() ? '' : 'username', password.trim() ? '' : 'password']);
            return;
        }

        dispatch(loginThunk({ username: username, password: password }))
            .then(() => {
                nav('/');
            });
    };

    const handleInputChange = (field, value) => {
        if (invalidFields.includes(field)) {
            setInvalidFields(invalidFields.filter(item => item !== field));
        }

        if (field === 'username') {
            setUsername(value);
        } else if (field === 'password') {
            setPassword(value);
        }
    };

    return (
        <div className="container-login">
            <h1>Авторизация</h1>
            <input
                className={invalidFields.includes('username') ? 'invalid' : ''}
                value={username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                type="text"
                placeholder="Логин"
            />
            <input
                className={invalidFields.includes('password') ? 'invalid' : ''}
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                type="password"
                placeholder="Пароль"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default Log;
