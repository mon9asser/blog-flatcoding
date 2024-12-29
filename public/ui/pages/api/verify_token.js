import jwt from 'jsonwebtoken';
import { Helper } from '../../services/helper';

export default function handler(req, res) {
    const { token } = req.body; // Expect the token in the request body

    if (!token) {
        return res.json({ is_error: true, message: 'Token is required' });
    }

    try {
        // Replace `your_secret_key` with your actual secret key
        const decoded = jwt.verify(token, Helper.jwt_secret);
        return res.status(200).json({ message: 'Token is valid', data: decoded, is_error: false });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', is_error: true,  message: error.message });
    }
}