import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
  Table
} from 'sequelize-typescript';

@Table({ underscored: true, freezeTableName: true })
export class BaseModel extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column({
    primaryKey: true,
    defaultValue: Sequelize.fn('uuid_generate_v4'),
    type: DataType.INTEGER
  })
  declare id: number; // we have to use declare
  // https://sequelize.org/docs/v6/core-concepts/model-basics/#caveat-with-public-class-fields
}
