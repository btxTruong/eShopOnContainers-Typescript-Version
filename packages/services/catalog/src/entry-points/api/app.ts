import express from 'express';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@swagger-document';
import { apiV1Route } from './routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

app.get('/', async (req, res) => {
  res.redirect('/swagger/v1');
})
app.use('/api/v1', apiV1Route);
app.use('/swagger/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app };
