import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig.js';
import router from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        persistAuthorization: true,
    },
}));


// logs
const logStream = fs.createWriteStream('logs.txt', { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Routeur
app.use(router);

export default app;
