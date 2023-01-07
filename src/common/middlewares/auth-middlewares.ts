import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.ENCRYPTION_CHARS;
const authenticate = (req: { headers: any; userLogged: any }, res: any, next: () => void) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const verify: any = jwt.verify(token, secret ? secret : 'abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890');
        req.userLogged = verify.user;
        next();
    } catch (error) {
        next();
    }
}

module.exports = {
    authenticate
}