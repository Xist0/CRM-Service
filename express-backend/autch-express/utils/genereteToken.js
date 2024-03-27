import jwt from 'jsonwebtoken'


export const generateAccessToken = (id, role, name) => {
    const payload = {
        id,
        name,
        role
    }

    return jwt.sign(payload, '4362734262347', {expiresIn: '1s'})
}