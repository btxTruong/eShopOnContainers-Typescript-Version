import { listCatalogsCT } from '@domain/catalog/catalog-controller';
import express from 'express';

const catalogRouter = express.Router();

catalogRouter.get('/catalog', listCatalogsCT);

export { catalogRouter };
