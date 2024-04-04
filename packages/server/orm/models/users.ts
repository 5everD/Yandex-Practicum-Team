import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
} from 'sequelize-typescript'
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

@Table({ tableName: 'users', timestamps: true })
class Users extends Model<UsersAttributes, UsersCreateAttributes> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  declare authorIndex: CreationOptional<number>

  @Column({ type: DataType.STRING, field: 'user_display_name' })
  declare author: string
}

export default Users

export type UsersAttributes = InferAttributes<Users>
export type UsersCreateAttributes = InferCreationAttributes<Users>
