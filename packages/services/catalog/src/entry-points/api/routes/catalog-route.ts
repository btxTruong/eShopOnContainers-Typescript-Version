import express from 'express';
import { listCatalogsCT } from '@domain/catalog/catalog-controller';

const catalogRouter = express.Router();

catalogRouter.get('/catalog', listCatalogsCT);

export { catalogRouter };
