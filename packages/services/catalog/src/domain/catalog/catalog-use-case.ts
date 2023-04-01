import { Catalog } from '@infra/database/models/definitions/Catalog';
import {
  getCatalogByIdRP, listCatalogBrandRP,
  listCatalogByNameRP,
  listCatalogByTypeAndBrandRP,
  listCatalogRP, listCatalogTypeRP, createCatalogRP, deleteCatalogRP
} from '@domain/catalog/catalog-repo';
import { isDefined } from '../../utils/type';
import httpErrors from 'http-errors';

export async function listCatalogs(pageSize: number, pageIndex: number) {
  return await listCatalogRP(pageSize, pageIndex);
}

export async function getCatalogUC(id: number) {
  return await getCatalogByIdRP(id);
}

export async function listCatalogsByNameUC(name: string, pageSize: number, pageIndex: number) {
  return await listCatalogByNameRP(name, pageSize, pageIndex);
}

export async function listCatalogByTypeAndBrandUC(pageSize: number, pageIndex: number, catalogTypeId: number, catalogBrandId?: number) {
  return await listCatalogByTypeAndBrandRP(pageSize, pageIndex, catalogTypeId, catalogBrandId);
}

export async function listCatalogByBrandUC(pageSize: number, pageIndex: number, catalogBrandId: number) {
  return await listCatalogByTypeAndBrandRP(pageSize, pageIndex, undefined, catalogBrandId);
}

export async function listCatalogTypeUC() {
  return await listCatalogTypeRP();
}

export async function listCatalogBrandUC() {
  return await listCatalogBrandRP();
}

export async function updateCatalogUC(catalogToUpdate: Partial<Catalog>) {
  const catalog = await getCatalogByIdRP(catalogToUpdate.id!, true);

  if (!isDefined(catalog)) {
    new httpErrors.NotFound(`Catalog with id ${catalogToUpdate.id} not found`);
  }
  const oldPrice = catalog?.price;
  const shouldRaiseProductPriceChangedEvent = oldPrice != catalogToUpdate.price;

  await catalog?.update(catalogToUpdate);

  if (shouldRaiseProductPriceChangedEvent) {
    // TODO: Truong update to use event
  }
}

export async function createCatalogUC(catalogToCreate: Partial<Catalog>) {
  const catalogFields = {
    catalogBrandId: catalogToCreate.catalogBrandId,
    catalogTypeId: catalogToCreate.catalogTypeId,
    description: catalogToCreate.description,
    name: catalogToCreate.name,
    pictureFileName: catalogToCreate.pictureFilename,
    price: catalogToCreate.price,
  };

  return await createCatalogRP(catalogFields);
}

export async function deleteCatalogUC(catalogId: number) {
  return await deleteCatalogRP(catalogId)
}
