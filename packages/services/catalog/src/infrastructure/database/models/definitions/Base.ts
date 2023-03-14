import { Column, DataType, Model, PrimaryKey, Sequelize, Table } from 'sequelize-typescript';

@Table({ underscored: true })
export class BaseModel extends Model {
  @PrimaryKey
  @Column({
    primaryKey: true,
    defaultValue: Sequelize.fn('uuid_generate_v4'),
    type: DataType.UUIDV4
  })
  declare id: string;
}
