import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regThunk } from '../../redux/regSlice';
import { useNavigate } from 'react-router-dom';

const Reg = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const regState = useSelector((state) => state.reg);
    const [roles, setRoles] = useState([]);
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
    }, [dispatch]);

    const handleRegistration = async () => {
        if (!username || !password || !selectedRole) {
            setUsernameError(!username);
            setPasswordError(!password);
            setRoleError(!selectedRole);
            return;
        }

        try {
            const response = await dispatch(regThunk({
                username: username,
                password: password,
                roleName: selectedRole
            }));
            setUsername('');
            setPassword('');
            setSelectedRole('');
            setErrorMessage(response.message || ''); // Устанавливаем сообщение из ответа
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(false);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        setRoleError(false);
    };

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <input
                value={username}
                onChange={handleUsernameChange}
                type="text"
                placeholder="Имя"
                style={{ borderColor: usernameError ? 'red' : '' }}
            />
            <input
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Пароль"
                style={{ borderColor: passwordError ? 'red' : '' }}
            />
            <select
                name="role"
                onChange={handleRoleChange}
                value={selectedRole}
                style={{ borderColor: roleError ? 'red' : '' }}
            >
                <option value="" disabled hidden>Выберите роль</option>
                {roles.map(role => (
                    <option key={role.role} value={role.role}>{role.role}</option>
                ))}
            </select>
            <button
                onClick={handleRegistration}
                disabled={!username || !password || !selectedRole}
                style={{ backgroundColor: !username || !password || !selectedRole ? 'grey' : '' }}
            >
                Register
            </button>
        </div>
    );
};

export default Reg;
