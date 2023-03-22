import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Table
} from 'sequelize-typescript';
import { BaseModel } from './Base';
import { CatalogBrand } from './CatalogBrand';
import { CatalogType } from './CatalogType';

@Table({ tableName: 'catalogs' })
export class Catalog extends BaseModel {
  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  type: string;

  @Column(DataType.STRING)
  description?: string;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  price?: number;

  @Column(DataType.STRING)
  pictureFilename?: string;

  @AllowNull(false)
  @Column(DataType.UUIDV4)
  @ForeignKey(() => CatalogType)
  catalogTypeId: string;

  @BelongsTo(() => CatalogType)
  catalogType: CatalogType;

  @AllowNull(false)
  @Column(DataType.UUIDV4)
  @ForeignKey(() => CatalogBrand)
  catalogBrandId: string;

  @BelongsTo(() => CatalogBrand)
  catalogBrand: CatalogBrand;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  availableStock: number;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  restockThreshold: number;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  maxStockThreshold: number;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  onReorder: boolean;
}
