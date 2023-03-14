import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from './Base';
import { CatalogBrand } from './CatalogBrand';
import { CatalogType } from './CatalogType';

@Table({ tableName: 'catalog_items' })
export class CatalogItem extends BaseModel {
  @Column(DataType.STRING)
  name?: string;

  @Column(DataType.STRING)
  description?: string;

  @Column(DataType.DOUBLE)
  price?: number;

  @Column(DataType.STRING)
  pictureFilename?: string;

  @Column(DataType.STRING)
  pictureUri?: string;

  @Column(DataType.UUIDV4)
  @ForeignKey(() => CatalogType)
  catalogTypeId: string;

  @BelongsTo(() => CatalogType)
  catalogType: CatalogType;

  @Column(DataType.UUIDV4)
  @ForeignKey(() => CatalogBrand)
  catalogBrandId: string;

  @BelongsTo(() => CatalogBrand)
  catalogBrand: CatalogBrand;

  @Column(DataType.INTEGER)
  availableStock: number;

  @Column(DataType.INTEGER)
  restockThreshold: number;

  @Column(DataType.INTEGER)
  maxStockThreshold: number;

  @Column(DataType.BOOLEAN)
  onReorder: boolean;
}
