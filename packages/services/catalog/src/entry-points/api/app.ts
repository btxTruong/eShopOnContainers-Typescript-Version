import express from 'express';
import compression from 'compression';
import { routerV1 } from './routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

app.use('/api/v1', routerV1);

export { app };
