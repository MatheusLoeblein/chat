import * as jwt from 'jsonwebtoken'
import { JWT_SERCRET } from '../../config/config'


interface IJwtData {
    accountId: string;
    name: string;
    cover: string;
}

const sign = (data: IJwtData) => {

    if (!JWT_SERCRET) throw new Error('jwt secret is not present in the settings')

    return jwt.sign(data, JWT_SERCRET, {
        expiresIn: '24h'
    })
}


const verify = (token: string): IJwtData | Error => {

    if (!JWT_SERCRET) throw new Error('jwt secret is not present in the settings')

    try {
        const decoded = jwt.verify(token, JWT_SERCRET)

        if (typeof decoded === 'string') throw new Error('Invalid token')

        return decoded as IJwtData
    }
    catch (e) {

        throw new Error('Invalid token')
    }
}


export const JWTService = { sign, verify }
