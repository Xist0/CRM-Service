import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regThunk } from '../../redux/regSlice';
import { useNavigate } from 'react-router-dom';

const Reg = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const regState = useSelector((state) => state.reg);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleRegistration = () => {
        dispatch(regThunk({
            username: username,
            password: password
        }));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        regState.error ? <p>{regState.error}</p> :
            regState.loading ? <p>Loading...</p> :
                <div>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="Username" />
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="Password" />
                    <button onClick={handleRegistration}>Register</button>
                </div>
    );
};

export default Reg;
