import express from 'express';
import cors from 'cors';
import swaggerDocs from './config/swagger.config.js';
import userRoutes from './routes/user.routes.js';
import tapRoutes from './routes/tap.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tap', tapRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto => ${PORT}`);
    swaggerDocs(app, PORT);
});