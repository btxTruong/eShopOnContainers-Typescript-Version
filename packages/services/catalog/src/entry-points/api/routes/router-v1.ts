import express from 'express';
import { catalogRouter } from './catalog';

const routerV1 = express.Router();

routerV1.get('/', (req, res) => {
  res.json({ message: 'Oh yeah. hea' });
});

routerV1.use('/catalog', catalogRouter);

export { routerV1 };
