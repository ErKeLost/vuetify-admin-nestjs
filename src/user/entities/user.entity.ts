import { Profile } from './profile.entity';
import { Logs } from '../../logs/entities/logs.entity';
import { Roles } from '../../roles/entities/roles.entity';
import {
  AfterInsert,
  AfterRemove,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 形成最终的一个实体类
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @AfterInsert()
  afterInsert() {
    console.log('afterInsert');
  }

  @AfterRemove()
  afterRemove() {
    console.log('afterRemove');
  }
}
