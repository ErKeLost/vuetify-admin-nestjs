import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

// 形成最终的一个实体类
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column()
  address: string;

  // 创建关联关系 传递相应回来的一个实体类的类型
  @OneToOne(() => User)
  // 告诉在哪个表格里面创建字段
  @JoinColumn({ name: 'uid' })
  // 传递一个user的实体类
  user: User;
}
