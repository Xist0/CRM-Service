import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { regThunk } from '../../redux/regSlice';
import { useNavigate } from 'react-router-dom';

const Reg = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState(true); // Установим начальное значение в true
    const [passwordError, setPasswordError] = useState(true); // Установим начальное значение в true
    const [roleError, setRoleError] = useState(true); // Установим начальное значение в true
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
        const value = e.target.value;
        setUsername(value);
        setUsernameError(!value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(!value);
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        setSelectedRole(value);
        setRoleError(!value);
    };

    return (
        <div>
            <div className="forma-input">
                <div className="container-reg-users">
                    {errorMessage && <p>{errorMessage}</p>}
                    <label className="input-column">
                        <input
                            className={`input-style ${usernameError ? 'input-error' : 'input-valid'}`}
                            value={username}
                            onChange={handleUsernameChange}
                            type="text"
                            placeholder="Имя"
                        />
                        <input
                            className={`input-style ${passwordError ? 'input-error' : 'input-valid'}`}
                            value={password}
                            onChange={handlePasswordChange}
                            type="password"
                            placeholder="Пароль"
                        />
                        <select
                            name="role"
                            className={`input-style ${roleError ? 'input-error' : 'input-valid'}`}
                            onChange={handleRoleChange}
                            value={selectedRole}
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
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Reg;
