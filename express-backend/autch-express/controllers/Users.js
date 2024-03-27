import { sql } from "../../db.js";

// Контроллер получения списка пользователей
export const getUsers = async (req, res) => {
    try {
        // Выполнение SQL-запроса для получения списка пользователей и их ролей
        const users = await sql`SELECT name, role FROM public.users ORDER BY id ASC`;

        // Отправка списка пользователей в ответ на запрос
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении списка пользователей:', error);
        // Отправка сообщения об ошибке в случае неудачи
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};
