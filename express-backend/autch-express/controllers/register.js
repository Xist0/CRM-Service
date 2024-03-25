import { sql } from "../../db.js";
import bcrypt from 'bcryptjs';

// Контроллер регистрации
export const register = async (req, res) => {
    const { username, password, roleName } = req.body;
    console.log('Полученные данные:', { username, password, roleName });
    try {
        console.log('Имя пользователя:', username);
        console.log('Пароль:', password);
        console.log('Роль:', roleName);

        const candidate = await sql`SELECT * FROM Users WHERE name = ${username} LIMIT 1`[0];

        if (candidate) {
            return res.status(400).send("Пользователь уже существует");
        }

        const hashPassword = bcrypt.hashSync(password, 7);

        const userRole = await sql`SELECT role FROM Roles WHERE role = ${roleName} LIMIT 1`;
        if (!userRole || userRole.length === 0) {
            return res.status(400).send("Роль не найдена");
        }
        // Передаем только значение роли, а не объект целиком
        await sql`INSERT INTO Users(name, role, password) VALUES (${username}, ${userRole[0].role}, ${hashPassword})`;

        return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Контроллер получения списка ролей
export const getRoles = async (req, res) => {
    try {
        const roles = await sql`SELECT * FROM Roles`;
        res.json(roles);
    } catch (error) {
        console.error('Ошибка при получении списка ролей:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};
