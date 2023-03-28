import { Catalog } from '@infra/database/models/definitions/Catalog';
import { genDefaultParams, genPaginationParams } from '../../utils/database';
import { CatalogBrand } from '@infra/database/models/definitions/CatalogBrand';
import { CatalogType } from '@infra/database/models/definitions/CatalogType';

export async function listCatalogRP(pageSize: number, pageIndex: number) {
  return await Catalog.findAll({
    ...genPaginationParams(pageSize, pageIndex),
    ...genDefaultParams(),
    include: [
      CatalogBrand,
      CatalogType
    ]
  });
}

export async function getCatalogByIdRP(id: number, raw: boolean = false) {
  const include = raw ? [] : [CatalogBrand, CatalogType];
  return await Catalog.findByPk(id, {
    ...genDefaultParams(),
    include
  });
}

export async function listCatalogByNameRP(name: string, pageSize: number, pageIndex: number) {
  return await Catalog.findOne({
    where: {
      name: name
    },
    ...genDefaultParams(),
    ...genPaginationParams(pageSize, pageIndex),
    include: [
      CatalogBrand,
      CatalogType
    ]
  });
}

export async function listCatalogByTypeAndBrandRP(pageSize: number, pageIndex: number, catalogTypeId?: number, catalogBrandId?: number) {
  return await Catalog.findAll({
    where: {
      catalogTypeId,
      catalogBrandId
    },
    ...genDefaultParams(),
    ...genPaginationParams(pageSize, pageIndex),
    include: [
      CatalogBrand,
      CatalogType
    ]
  });
}

export async function listCatalogBrandRP() {
  return await CatalogBrand.findAll({
    ...genDefaultParams()
  });
}

export async function listCatalogTypeRP() {
  return await CatalogType.findAll({
    ...genDefaultParams()
  });
}

export async function updateCatalogRP(catalogToUpdate: Partial<Catalog>) {
  return await Catalog.update(catalogToUpdate, {
    where: { id: catalogToUpdate.id }, ...genDefaultParams(),
    returning: true
  });
}

export async function createCatalogRP(catalogToCreate: Partial<Catalog>) {
  return await Catalog.create(catalogToCreate, { returning: true, ...genDefaultParams() });
}

export async function deleteCatalogRP(id: number) {
  return await Catalog.destroy({ where: { id } });
}
