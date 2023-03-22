import { AllowNull, Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './Base';

@Table({ tableName: 'catalog_types' })
export class CatalogType extends BaseModel {
  @AllowNull(false)
  @Column(DataType.STRING(100))
  type: string;
}
