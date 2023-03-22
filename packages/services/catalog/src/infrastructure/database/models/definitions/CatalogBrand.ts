import { AllowNull, Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './Base';

@Table({ tableName: 'catalog_brands' })
export class CatalogBrand extends BaseModel {
  @AllowNull(false)
  @Column(DataType.STRING(100))
  brand: string;
}
