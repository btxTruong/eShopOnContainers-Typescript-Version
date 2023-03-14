import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './Base';

@Table({ tableName: 'catalog_types' })
export class CatalogType extends BaseModel {
  @Column(DataType.STRING)
  type?: string;
}
