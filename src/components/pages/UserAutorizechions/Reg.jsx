import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regThunk } from '../../redux/regSlice';
import { useNavigate } from 'react-router-dom';

const Reg = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [roles, setRoles] = useState([]);
    const regState = useSelector((state) => state.reg);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('https://localhost:3000/roles');
                const data = await response.json();
                setRoles(data);
            } catch (error) {
                console.error('Ошибка при загрузке списка ролей:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleRegistration = () => {
        console.log('Отправляемые данные:', {
            username: username,
            password: password,
            roleName: selectedRole
        });
        dispatch(regThunk({
            username: username,
            password: password,
            roleName: selectedRole
        }));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        console.log('Выбранная роль:', e.target.value);
    };

    return (
        regState.error ? <p>{regState.error}</p> :
            regState.loading ? <p>Loading...</p> :
                <div>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="Имя" />
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="Пароль" />
                    {Array.isArray(roles) ? (
                        <select name="role" onChange={handleRoleChange} value={selectedRole}>
                            <option value="" disabled hidden>Выберите роль</option>
                            {roles.map(role => (
                                <option key={role.role} value={role.role}>{role.role}</option>
                            ))}
                        </select>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <button onClick={handleRegistration}>Register</button>
                </div>
    );
};

export default Reg;