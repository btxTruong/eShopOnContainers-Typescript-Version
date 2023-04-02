import express from 'express';

import { catalogRouter } from './catalog-route';

const apiV1Route = express.Router();

apiV1Route.get('/', (req, res) => {
  res.json({ message: 'Oh yeah.' });
});

apiV1Route.use('/catalog', catalogRouter);

export { apiV1Route };
