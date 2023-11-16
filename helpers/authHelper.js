import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    }
    catch (error) {
        console.error(error);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    }
    catch (error) {
        console.error(error)
    }
}

export const generateToken = async (user) => {
    try {
        const token = await JWT.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
        if (token) {
            return token
        }
    }
    catch (error) {
        console.error(error);
    }
}