import { api } from './config/config.js';
import swaggerDocs from './config/swagger.config.js';
import middleware from './middlewares/token.middleware.js'
import express from 'express';
import cors from 'cors';
import user from './routes/user.routes.js';



const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/user', user);

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto => ${3000}`);
    swaggerDocs(app, 30000);
});