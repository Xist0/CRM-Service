import jwt from 'jsonwebtoken'

//функция для создания токеа
export const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }

    return jwt.sign(payload, '4362734262347', {expiresIn: '48h'})
}