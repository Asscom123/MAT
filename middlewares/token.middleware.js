import jwt from 'jsonwebtoken'
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dataEnv } from '../config/env.config.js';


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' })
    }

    jwt.verify(token, dataEnv.parsed.JWT_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Acceso Denagado. Token invalido' });
        }
        req.user = user;
        next();
    });
}

export default verifyToken;