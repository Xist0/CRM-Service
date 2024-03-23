import { jwt } from "jsonwebtoken"

export const genereteAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }

    return jwt.sign(payload, '4362734262347', {expiresIn: '48h'})
}