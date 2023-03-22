import { AllowNull, Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';
import { BaseModel } from './Base';

@Table({ tableName: 'integration_event_logs', underscored: true, freezeTableName: true })
export class IntegrationEventLog extends BaseModel {
  @AllowNull(false)
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4
  })
  declare id: string; // we have to use declare https://sequelize.org/docs/v6/core-concepts/model-basics/#caveat-with-public-class-fields

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  creationTime: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  eventTypeName: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  state: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  timesSent: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  transactionId: string;
}
