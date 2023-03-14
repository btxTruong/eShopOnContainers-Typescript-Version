import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './Base';

@Table({ tableName: 'catalog_brand' })
export class CatalogBrand extends BaseModel {
  @Column(DataType.STRING)
  brand?: string;
}
