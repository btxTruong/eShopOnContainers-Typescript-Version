import express from 'express';
import {
  createCatalogUC,
  deleteCatalogUC,
  getCatalogUC, listCatalogBrandUC, listCatalogByBrandUC,
  listCatalogByTypeAndBrandUC,
  listCatalogs,
  listCatalogsByNameUC, listCatalogTypeUC, updateCatalogUC
} from '@domain/catalog/catalog-use-case';
import { asNumber } from '../../utils/type';
import { Catalog } from '@infra/database/models/definitions/Catalog';
import { AppError } from '@eshop/error-handler';
import { config } from '@config';

export async function listCatalogsCT(req: express.Request, res: express.Response) {
  const pageSize = asNumber(req.query.pageSize, config.get('app.paginationPageSize')) as number;
  const pageIndex = asNumber(req.query.pageIndex, 0) as number;
  const catalogs = await listCatalogs(pageSize, pageIndex);
  res.status(200).json(catalogs);
}

export async function getCatalogCT(req: express.Request, res: express.Response) {
  const catalogId = asNumber(req.params.id) as number;
  const catalog = await getCatalogUC(catalogId);
  res.status(200).json(catalog);
}

export async function listCatalogByNameCT(req: express.Request, res: express.Response) {
  const pageSize = asNumber(req.query.pageSize, config.get('app.paginationPageSize')) as number;
  const pageIndex = asNumber(req.query.pageIndex, 0) as number;
  const catalogs = await listCatalogsByNameUC(req.query.name as string, pageSize, pageIndex);
  res.status(200).json(catalogs);
}

export async function listCatalogByTypeAndBrandCT(req: express.Request, res: express.Response) {
  const pageSize = asNumber(req.query.pageSize, config.get('app.paginationPageSize')) as number;
  const pageIndex = asNumber(req.query.pageIndex, 0) as number;

  const catalogTypeId = asNumber(req.params.catalogTypeId, undefined, true) as number;
  const catalogBrandId = asNumber(req.params.catalogBrandId);

  const catalogs = await listCatalogByTypeAndBrandUC(pageSize, pageIndex, catalogTypeId, catalogBrandId);
  res.status(200).json(catalogs);
}

export async function listCatalogByBrandCT(req: express.Request, res: express.Response) {
  const pageSize = asNumber(req.query.pageSize, config.get('app.paginationPageSize')) as number;
  const pageIndex = asNumber(req.query.pageIndex) as number;

  const catalogBrandId = asNumber(req.params.catalogBrandId, undefined, true) as number;

  const catalogs = await listCatalogByBrandUC(pageSize, pageIndex, catalogBrandId);
  res.status(200).json(catalogs);
}

export async function listCatalogTypes(req: express.Request, res: express.Response) {
  const catalogTypes = await listCatalogTypeUC();
  res.status(200).json(catalogTypes);
}

export async function listCatalogBrands(req: express.Request, res: express.Response) {
  const catalogBrands = await listCatalogBrandUC();
  res.status(200).json(catalogBrands);
}

export async function updateCatalogCT(req: express.Request, res: express.Response) {
  // TODO: Truong Bui using schema to control input params
  const catalogToUpdate = req.body.catalogToUpdate as Partial<Catalog>;

  try {
    await updateCatalogUC(catalogToUpdate);
  } catch (error) {
    new AppError('failed-to-update-catalog', error.message, 500, true, error);
  }
}

export async function createCatalogCT(req: express.Request, res: express.Response) {
  // TODO: Truong Bui using schema to control input params
  const catalogToCreate = req.body.catalogToCreate as Partial<Catalog>;

  try {
    await createCatalogUC(catalogToCreate);
    res.status(200);
  } catch (error) {
    new AppError('failed-to-create-catalog', error.message, 500, true, error);
  }
}

export async function deleteCatalogCT(req: express.Request, res: express.Response) {
  const catalogId = asNumber(req.query.id, undefined, true) as number;
  try {
    await deleteCatalogUC(catalogId);
    res.status(200);
  } catch (error) {
    new AppError('failed-to-delete-catalog', error.message, 500, true, error);
  }
}
